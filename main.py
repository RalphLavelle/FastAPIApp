from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from dotenv import load_dotenv

# Load environment variables from .env file into os.environ
load_dotenv()

import fine_tune;
import os;

app = FastAPI()

app.mount("/app", StaticFiles(directory="app"), name="static")

class Prompt(BaseModel):
    text: str

@app.get("/")
def read_root():
    return { "answer": "Hello World" }

@app.post("/")
async def get_answer(prompt: Prompt):
    fine_tune.vectorstore.similarity_search(prompt.text)

    from langchain.chains import RetrievalQA
    from langchain.chat_models import ChatOpenAI

    openAIApiKey = os.environ.get('OPENAI_API_KEY')
    llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=1, openai_api_key=openAIApiKey)
    qa_chain = RetrievalQA.from_chain_type(
       llm,
       retriever=fine_tune.vectorstore.as_retriever()
    )
    result = qa_chain({"query": prompt.text})
    return {"prompt": prompt.text, "answer": result["result"]}