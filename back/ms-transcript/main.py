from fastapi import FastAPI
import whisper

app = FastAPI()

@app.get("/")
async def transcript():
    model = whisper.load_model("base")
    result = model.transcribe("audio.mp3")
    return {"message": result["text"]}