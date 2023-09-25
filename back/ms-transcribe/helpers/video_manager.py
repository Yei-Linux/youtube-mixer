from moviepy.editor import VideoFileClip, concatenate_videoclips
from models.video_editor import Range

async def transform_video_to_audio(path_target: str,path_dest:str):
    video = VideoFileClip(path_target)
    video.audio.write_audiofile(path_dest)

async def cut_video_by_ranges(video_path: str, rangesConfig : [Range], unique_id_gen: str): 
    general_clip = VideoFileClip(video_path)
    file_names = []

    for index, rangeConfig in enumerate(rangesConfig):
        subclip = general_clip.subclip(rangeConfig.start,rangeConfig.end)
        file_name = f"zip_files/{unique_id_gen}_cut_{index}.mp4"
        subclip.write_videofile(file_name)
        file_names.append(file_name)

    return file_names

async def remove_parts_from_video(video_path: str, rangesConfig : [Range], unique_id_gen: str):
    general_clip = VideoFileClip(video_path)
    ranges_to_remove: [Range] = []
    subclips = []

    for index, rangeConfig in enumerate(rangesConfig):
        start = rangesConfig[index].start
        end = rangesConfig[index].end
        if index is 0 and start is not 0:
            start = 0

        subclip = general_clip.subclip(rangeConfig.start,rangeConfig.end)
        subclips.append(subclip)

    final_clip = concatenate_videoclips(subclips)
    file_name = f"zip_files/{unique_id_gen}_remove_{index}.mp4"

    final_clip.write_videofile(file_name)

    return [file_name]