from fastapi import FastAPI, File
from pydantic import BaseModel
from os import getcwd
from fastapi.responses import FileResponse
from emotion_detective import predict
from music_emotion_recommend import emotion_recommend
from music_characteristic_recommend import character_recommend
import json

app = FastAPI()

class Item(BaseModel):
    diaryContent : str
    playListMusicsList : list

class Song(BaseModel):
    musicSeq: int
    playListMusicsList : list

@app.post("/recommend/emotion")
async def emo_recommend(item: Item):
    item = dict(item)
    text = item["diaryContent"]
    already_like = item["playListMusicsList"]
    already_like = set(already_like)
    already_like = list(already_like)
    A, B = predict(text)
    emo_results = emotion_recommend(A, already_like)
    return {
        'emotion' : B,
        'recommendList': [
        emo_results[0],
        emo_results[1],
        emo_results[2],
        emo_results[3],
        emo_results[4],
        ]
    }

@app.post("/recommend/characteristic")
async def char_recommend(song : Song):
    print(song)
    print(type(song))
    song = dict(song)
    song_id = song['musicSeq']
    already_like = song['playListMusicsList']
    already_like = set(already_like)
    already_like = list(already_like)
    char_results = character_recommend(song_id, already_like)
    return {
        'recommendList' : [
        char_results[0],
        char_results[1],
        char_results[2],
        char_results[3],
        char_results[4],
        ]
    }
# uvicorn fastApi:app --reload
