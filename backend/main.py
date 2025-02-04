import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests


class Quote(BaseModel):
    id: int
    quote: str
    author: str


app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://kabisa-quotes.onrender.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", response_model=Quote)
def get_quotes() -> Quote:
    response = requests.get("https://dummyjson.com/quotes/random")
    
    if response.status_code == 200:
        data = response.json()
        return Quote(id=data["id"], quote=data["quote"], author=data["author"])
    
    raise HTTPException(status_code=response.status_code, detail="Failed to fetch data from the API")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
