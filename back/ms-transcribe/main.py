from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

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
    #transcription_timestamp = await transcribe_audio_to_text_timestamp(path_audio)

    remove_file(path_video)
    remove_file(path_audio)

    #return {"data": transcription_timestamp, "statusText": "OK"}
    return response_transcription

@app.post("/api/video-editor")
async def video_editor(request: VideoEditorRequest ,file: UploadFile = File(...)):
    if request.type != 'cut' and request.type != 'remove':
        raise HTTPException(status_code =500, detail = "Type should be either cut or remove")

    unique_id_gen = unique_id()
    video = f"{unique_id_gen}.mp4"

    path_video = os.path.join('files', video)
    save_upload_file(file,path_video)

    rangesConfig = request.rangeConfig
    file_names: [str] = []

    if request.type == 'cut':
       file_names = await cut_video_by_ranges(path_video, rangesConfig, unique_id_gen)
    if request.type == 'remove':
       file_names = await remove_parts_from_video(path_video, rangesConfig, unique_id_gen)

    zip_io_values = zip_file(file_names)

    for file_path in file_names:
        remove_file(file_path)

    return StreamingResponse(
        iter([zip_io_values.getvalue()]), 
        media_type="application/x-zip-compressed", 
        headers = { "Content-Disposition": f"attachment; filename=videos.zip"}
    )

if __name__ == '__main__':
    uvicorn.run("main:app",reload=True)