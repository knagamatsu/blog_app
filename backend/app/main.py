from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import databases
import sqlalchemy

# データベース URL
DATABASE_URL = "sqlite:///./test.db"

# データベース
database = databases.Database(DATABASE_URL)

# メタデータ
metadata = sqlalchemy.MetaData()

# 投稿テーブル
posts = sqlalchemy.Table(
    "posts",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("title", sqlalchemy.String),
    sqlalchemy.Column("content", sqlalchemy.String),
)

# エンジンとテーブルの作成
engine = sqlalchemy.create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)
metadata.create_all(engine)

app = FastAPI()

# CORSミドルウェアの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PostIn(BaseModel):
    title: str
    content: str

class Post(BaseModel):
    id: int
    title: str
    content: str

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.get("/posts", response_model=List[Post])
async def read_posts():
    query = posts.select()
    return await database.fetch_all(query)

@app.post("/posts", response_model=Post)
async def create_post(post: PostIn):
    query = posts.insert().values(title=post.title, content=post.content)
    last_record_id = await database.execute(query)
    return {**post.dict(), "id": last_record_id}

@app.get("/posts/{post_id}", response_model=Post)
async def read_post(post_id: int):
    query = posts.select().where(posts.c.id == post_id)
    result = await database.fetch_one(query)
    if result is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return result

@app.put("/posts/{post_id}", response_model=Post)
async def update_post(post_id: int, post: PostIn):
    query = posts.update().where(posts.c.id == post_id).values(title=post.title, content=post.content)
    await database.execute(query)
    return {**post.dict(), "id": post_id}

@app.delete("/posts/{post_id}")
async def delete_post(post_id: int):
    query = posts.delete().where(posts.c.id == post_id)
    await database.execute(query)
    return {"message": "Post deleted successfully"}