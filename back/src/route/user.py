from sqlmodel import select
from fastapi import APIRouter, Query, HTTPException
from typing import Annotated

user_router = APIRouter()

from ..model.model import *
from ..helper.db import session_depends

@user_router.get("/", response_model=list[UserPublic])
def read_users(
    session: session_depends
):
    users = session.exec(
        select(User)
    ).all()
    
    return users

@user_router.get("/{id_user}", response_model=UserPublic)
def read_user(
    id_user: int, 
    session: session_depends
):
    user = session.get(User, id_user)
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user

@user_router.post("/", response_model=UserCreate)
def create_user(
    *, 
    session: session_depends, 
    user: UserCreate
):
    db_user = User.model_validate(user)

    try:
        session.add(db_user)
        session.commit()
        session.refresh(db_user)
    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))

    return db_user

@user_router.post("/login")
def login_user(
    *, 
    session: session_depends, 
    user: UserCreate
):
    try:
        session.exec(
            select(User)
            .filter(User.name == user.name)
            .filter(User.password == user.password)
        ).one()
    except:
        raise HTTPException(status_code=404, detail="User or Password invalid.")
    
    return user

@user_router.delete("/{id_user}")
def delete_user(
    id_user: int, 
    session: session_depends
):
    user = session.get(User, id_user)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    session.delete(user)
    session.commit()

    return {"id_user": id_user}