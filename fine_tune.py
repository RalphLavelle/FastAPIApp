# load the book
from langchain.document_loaders import UnstructuredHTMLLoader
loader = UnstructuredHTMLLoader("syktw.html")
book = loader.load()

# split it into chunks
from langchain.text_splitter import RecursiveCharacterTextSplitter
text_splitter = RecursiveCharacterTextSplitter(chunk_size = 500, chunk_overlap = 0)
all_splits = text_splitter.split_documents(book)

# create the vector store
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
vectorstore = Chroma.from_documents(documents=all_splits, embedding=OpenAIEmbeddings())