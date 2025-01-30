from sqlmodel import select
from fastapi import APIRouter, Query, HTTPException
from typing import Annotated

post_router = APIRouter()

from ..model.model import *
from ..helper.db import session_depends

@post_router.get("/", response_model=list[PostWithInteractionUser])
def read_post(
    session: session_depends,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
):
    post = session.exec(
        select(Post)
        .offset(offset)
        .limit(limit)
    ).all()

    return post

@post_router.get("/{id_post}", response_model=PostWithInteractionUser)
def read_post(
    id_post: int, 
    session: session_depends
):
    post = session.get(Post, id_post)

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    return post

@post_router.post("/", response_model=PostPublic)
def create_post(
    *, 
    session: session_depends, 
    post: PostCreate
):
    db_post = Post.model_validate(post)

    user = session.get(User, post.id_user)
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    session.add(db_post)
    session.commit()
    session.refresh(db_post)

    return db_post

@post_router.patch("/{id_post}", response_model=PostPublic)
def update_post(
    id_post: int, 
    post: PostUpdate, 
    session: session_depends
):
    post_db = session.get(Post, id_post)
    
    if not post_db:
        raise HTTPException(status_code=404, detail="Post not found")
    
    post_data = post.model_dump(exclude_unset=True)
    post_db.sqlmodel_update(post_data)
    
    session.add(post_db)
    session.commit()
    session.refresh(post_db)
    
    return post_db

@post_router.delete("/{id_post}")
def delete_post(
    id_post: int,
    session: session_depends
):
    post = session.get(Post, id_post)
    
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    session.delete(post)
    session.commit()
    
    return {"id_post": id_post}