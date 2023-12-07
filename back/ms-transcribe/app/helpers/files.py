from fastapi import UploadFile
from pathlib import Path
import shutil
import os
from io import BytesIO
import zipfile
from uuid import uuid4

def save_upload_file(upload_file: UploadFile, destination: str) -> str:
    try:
        with open(destination,"wb") as buffer:
            shutil.copyfileobj(upload_file.file, buffer)
    finally:
        upload_file.file.close()

def unique_id():
    return str(uuid4())

def remove_file(destination: Path): 
    os.remove(destination)

def zip_file(filenames: [str], zip_filename: str):
    with zipfile.ZipFile(zip_filename, mode='w') as zip_object:
        for fpath in filenames:
            zip_object.write(fpath)
