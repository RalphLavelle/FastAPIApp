## FastAPI server

> uvicorn main:app --reload

http://localhost:8000 (Swagger docs: http://localhost:8000/docs)

## Docker
The Docker steps should be used only after local dev is done, and the app has been built. At the top-level build the Dockerfile (if using Azure, the namespace should be _rlfastapi.azurecr.io_, not DockerHub's _raftussah_)
> docker build --no-cache -t raftussah/fastapi:v1 .

Include this, isntead of the other version, to make sure stuff isn't being cached:
> RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

To run  
> docker run -p 80:80 --name fastapi raftussah/fastapi:v1

Then browse to http://localhost (see above for urls) 

To deploy:
In Docker extension, browse to the image and click _Deploy image to Azure App Service_