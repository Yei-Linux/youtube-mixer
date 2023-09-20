from fastapi import UploadFile
from pathlib import Path
import shutil
import os
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