from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

posts = [{"id": 1, "title": "Hello MyPustak", "body": "Backend is working!"}]
id_counter = 2

class Post(BaseModel):
    title: str
    body: str

@app.get("/posts")
def get_posts():
    return posts

@app.post("/posts")
def create_post(post: Post):
    global id_counter
    new_post = {"id": id_counter, "title": post.title, "body": post.body}
    posts.append(new_post)
    id_counter += 1
    return new_post

@app.delete("/posts/{post_id}")
def delete_post(post_id: int):
    global posts
    posts = [p for p in posts if p["id"] != post_id]
    return {"message": "Deleted"}