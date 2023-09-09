from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from dotenv import load_dotenv

import os

# Load environment variables from .env file into os.environ
load_dotenv()

openai_api_key = os.environ.get('OPENAI_API_KEY')

import app.fine_tune as fine_tune;

app = FastAPI()

app.mount("/app/client", StaticFiles(directory="app/client"), name="static")

class Prompt(BaseModel):
    text: str

@app.get("/")
def read_root():
    return { "answer": "Hello World11" }

@app.post("/")
async def get_answer(prompt: Prompt):
    fine_tune.vectorstore.similarity_search(prompt.text)

    from langchain.chains import RetrievalQA
    from langchain.chat_models import ChatOpenAI

    llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=1, openai_api_key=openai_api_key)
    qa_chain = RetrievalQA.from_chain_type(
       llm,
       retriever=fine_tune.vectorstore.as_retriever()
    )
    result = qa_chain({"query": prompt.text})
    return {"prompt": prompt.text, "answer": result["result"]}