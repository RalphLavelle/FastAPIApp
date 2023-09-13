## FastAPI server

> cd server
> uvicorn main:app --reload

http://localhost:8000

Swagger docs: http://localhost:8000/docs

## NextJS app
> cd client
< npm run dev

http://localhost:3000


## Docker
The Docker steps should be used only after local dev is done. First, build client-side:
> cd client
> npm run build

Then back to top-level (if not there):
> cd..
Then, build the top-level Dockerfile (if using Azure, the namespace should be _rlfastapi.azurecr.io_, not DockerHub's _raftussah_)
> docker build --no-cache -t raftussah/fastapi:v1 .

To run  
> docker run -p 80:80 --name fastapi raftussah/fastapi:v10
> docker run -p 3000:80 --name fastapi raftussah/fastapi:v1

Then browse to http://localhost (see above for urls) 

To deploy
In Docker extension, browse to the image, and click"
'Deploy image to Azure App Service'

http://localhost:8000/api
