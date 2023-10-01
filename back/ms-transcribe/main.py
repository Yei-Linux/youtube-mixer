from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.background import BackgroundTask
import uvicorn
import os
import json

from helpers.files import save_upload_file,unique_id,remove_file, zip_file
from helpers.video_manager import transform_video_to_audio, cut_video_by_ranges, remove_parts_from_video
from helpers.transcribe import transcribe_audio_to_text_timestamp
from mocks.response_transcription_mock import response_transcription

from models.video_editor import VideoEditorRequest

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
    transcription_timestamp = await transcribe_audio_to_text_timestamp(path_audio)

    remove_file(path_video)
    remove_file(path_audio)

    return {"data": transcription_timestamp, "statusText": "OK"}

@app.post("/api/video-editor")
async def video_editor(request_str = Form(...) ,file: UploadFile = File(...)):
    request = json.loads(request_str)
    if request["type"] != 'cut' and request["type"] != 'remove':
        raise HTTPException(status_code =500, detail = "Type should be either cut or remove")

    unique_id_gen = unique_id()
    video = f"{unique_id_gen}.mp4"
    zip_f = f"{unique_id_gen}.zip"

    path_video = os.path.join('files', video)
    path_zip = os.path.join('files', zip_f)
    save_upload_file(file,path_video)

    rangesConfig = request["rangeConfig"]
    rangesConfig.sort(key=lambda x: x["start"], reverse=False)

    file_names: [str] = []

    if request["type"] == 'cut':
        file_names = await cut_video_by_ranges(path_video, rangesConfig, unique_id_gen)
        zip_file(file_names, zip_filename= path_zip)

        remove_file(path_video)
        for file_path in file_names:
            remove_file(file_path)

        return FileResponse(path_zip,background=BackgroundTask(remove_file, path_zip))
    
    file_name = await remove_parts_from_video(path_video, rangesConfig, unique_id_gen)
    remove_file(path_video)
    
    return FileResponse(file_name,background=BackgroundTask(remove_file, file_name))

if __name__ == '__main__':
    uvicorn.run("main:app",reload=True)