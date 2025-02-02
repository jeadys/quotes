import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class Quote(BaseModel):
    id: int
    quote: str
    author: str


class Quotes(BaseModel):
    quotes: list[Quote]


app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


memory_db = [Quote(id=1, quote="cool", author="yassin"), Quote(id=2, quote="wow", author="yassin")]

@app.get("/quotes", response_model=Quotes)
def get_quotes():
    return Quotes(quotes=memory_db)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
