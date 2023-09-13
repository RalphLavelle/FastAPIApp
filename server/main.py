from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from dotenv import load_dotenv

import os

# Load environment variables from .env file into os.environ
load_dotenv()

openai_api_key = os.environ.get('OPENAI_API_KEY')

import fine_tune as fine_tune;
import files as files;

app = FastAPI()

# set up CORS
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
) 

app.mount("/client", StaticFiles(directory="client", check_dir=False), name="client")

class Prompt(BaseModel):
    text: str

@app.get("/api")
def read_root():
    return { "answer": "Hello World13" }

@app.get("/api/books/{book_id}/parts/{part_id}/chapters/{chapter_id}")
def read_book(book_id: str, part_id: int, chapter_id: int):
    text = files.getFile(book_id, part_id, chapter_id)
    return text

@app.post("/api")
async def get_answer(prompt: Prompt):
    fine_tune.vectorstore.similarity_search(prompt.text)

    from langchain.chains import RetrievalQA
    from langchain.chat_models import ChatOpenAI

    llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=1, openai_api_key=openai_api_key)
    qa_chain = RetrievalQA.from_chain_type(
       llm,
       retriever=fine_tune.vectorstore.as_retriever()
    )
    fullPrompt = f"{prompt.text} - answer, sometimes using made-up words, as James Joyce or someone from Dublin would speak. If you don't know the answer just make something up."
    result = qa_chain({"query": fullPrompt})
    return {"prompt": prompt.text, "answer": result["result"]}