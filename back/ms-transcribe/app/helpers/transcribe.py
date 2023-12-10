import whisper_timestamped as whisper
from transformers_utils.transcription_timestamp import transform_transcription_timestamp_whisper

# Torch 2.0.1 is needed for dockerized apps
# Transcription is managed by whisper (in case we'll have troubles we can replace by a payment API)
async def transcribe_audio_to_text_timestamp(path_target:str):
    audio = whisper.load_audio(path_target)
    model = whisper.load_model("base")

    result = whisper.transcribe(model, audio, language="en")
    return transform_transcription_timestamp_whisper(result)

