from fastapi import FastAPI, UploadFile, File, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

from helpers.files import save_upload_file,unique_id,remove_file
from helpers.video_manager import transform_video_to_audio
from helpers.transcribe import transcribe_audio_to_text_timestamp
from mocks.response_transcription_mock import response_transcription

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/transcribe")
async def transcribe(file: UploadFile = File(...)):
    unique_id_gen = unique_id()
    video = f"{unique_id_gen}.mp4"
    audio = f"{unique_id_gen}.mp3"

    path_video = os.path.join('files', video)
    path_audio = os.path.join('files', audio)

    save_upload_file(file,path_video)

    await transform_video_to_audio(path_target=path_video,path_dest=path_audio)
    #transcription_timestamp = await transcribe_audio_to_text_timestamp(path_audio)

    remove_file(path_video)
    remove_file(path_audio)

    #return {"data": transcription_timestamp, "statusText": "OK"}
    return response_transcription

if __name__ == '__main__':
    uvicorn.run("main:app",reload=True)