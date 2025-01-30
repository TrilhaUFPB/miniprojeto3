from fastapi import APIRouter

from ..route.interaction import interaction_router
from ..route.user import user_router
from ..route.post import post_router

router = APIRouter()

router.include_router(
    router=interaction_router,
    prefix="/interaction",
    tags=["interaction"]
)

router.include_router(
    router=user_router,
    prefix="/user",
    tags=["user"]
)

router.include_router(
    router=post_router,
    prefix="/post",
    tags=["post"]
)
