from sqlmodel import select
from fastapi import APIRouter, Query, HTTPException
from typing import Annotated

interaction_router = APIRouter()

from ..model.model import *
from ..helper.db import session_depends

@interaction_router.get("/", response_model=list[InteractionPublic])
def read_interaction(
    session: session_depends
):
    interaction = session.exec(
        select(Interaction)
    ).all()

    return interaction

@interaction_router.get("/{id_intc}", response_model=InteractionPublic)
def read_interaction(
    id_intc: int, 
    session: session_depends
):
    interaction = session.get(Interaction, id_intc)

    if not interaction:
        raise HTTPException(status_code=404, detail="Interaction not found")

    return interaction

@interaction_router.post("/", response_model=InteractionPublic)
def create_post(
    *, 
    session: session_depends, 
    interaction: InteractionCreate
):
    db_interaction = Interaction.model_validate(interaction)

    user = session.get(User, interaction.id_user)
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    post = session.get(Post, interaction.id_post)

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    try:
        session.add(db_interaction)
        session.commit()
        session.refresh(db_interaction)
    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))

    return db_interaction

@interaction_router.patch("/{id_intc}", response_model=InteractionPublic)
def update_interaction(
    id_intc: int, 
    interaction: InteractionUpdate, 
    session: session_depends
):
    interaction_db = session.get(Interaction, id_intc)
    
    if not interaction_db:
        raise HTTPException(status_code=404, detail="Interaction not found")
    
    interaction_data = interaction.model_dump(exclude_unset=True)
    interaction_db.sqlmodel_update(interaction_data)
    
    session.add(interaction_db)
    session.commit()
    session.refresh(interaction_db)
    
    return interaction_db

@interaction_router.delete("/{id_intc}")
def delete_interaction(
    id_intc: int, 
    session: session_depends
):
    interaction = session.get(Interaction, id_intc)

    if not interaction:
        raise HTTPException(status_code=404, detail="Interaction not found")

    session.delete(interaction)
    session.commit()

    return {"id_intc": id_intc}
