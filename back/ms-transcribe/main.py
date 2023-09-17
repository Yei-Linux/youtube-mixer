from moviepy.editor import *
from fastapi import FastAPI
import whisper_timestamped as whisper

app = FastAPI()

@app.get("/")
async def transcribe():
    audio = whisper.load_audio("audio3.mp3")
    model = whisper.load_model("base")

    result = whisper.transcribe(model, audio, language="en")
    return {"subtitles": result["text"], "timeline": result["segments"]}