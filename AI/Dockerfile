
FROM python:3.7

WORKDIR /app/

COPY ./fastApi.py /app/
COPY ./ /app/

RUN pip install -r requirements.txt

CMD uvicorn --host=0.0.0.0 --port 8000 fastApi:app


