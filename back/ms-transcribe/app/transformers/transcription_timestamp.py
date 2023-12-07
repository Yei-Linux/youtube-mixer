def transform_transcription_timestamp_whisper(transcription_to_transform):
    timeline = map(lambda item: {"id": item["id"],"start": item["start"],"end": item["end"], "text": item["text"], "words": item["words"]}, transcription_to_transform["segments"])
    return {"subtitles": transcription_to_transform["text"], "timeline": list(timeline)}