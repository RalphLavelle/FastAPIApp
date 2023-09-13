FROM node:16-alpine AS client-build
WORKDIR /code
COPY ./client /code/

FROM python:3.9
WORKDIR /code
COPY ./server/requirements.txt /code/requirements.txt
COPY ./.env /code/.env
COPY ./server /code
COPY --from=client-build /code/out /code/client 
# RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
RUN pip install --upgrade -r /code/requirements.txt

EXPOSE 3000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]