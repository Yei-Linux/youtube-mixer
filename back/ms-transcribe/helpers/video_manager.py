from moviepy.editor import VideoFileClip

async def transform_video_to_audio(path_target: str,path_dest:str):
    video = VideoFileClip(path_target)
    video.audio.write_audiofile(path_dest)