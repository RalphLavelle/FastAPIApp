To run:
> uvicorn app.main:app --reload

then browse http://localhost/app/client/index.html

## Swagger
http://127.0.0.1:80/docs

## Docker
The Docker steps should be used only after local dev is done. First ```cd..``` to top-level if not there. Then, build the top-level Dockerfile (if using Azure, the namespace should be _rlfastapi.azurecr.io_, not DockerHub's _raftussah_)
> docker build --no-cache -t raftussah/fastapi:v1 .

To run  
> docker run -p 80:80 --name fastapi raftussah/fastapi:v10

Then browse to http://localhost (see above for urls) 

To deploy
In Docker extension, browse to the image, and click"
'Deploy image to Azure App Service'