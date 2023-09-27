from moviepy.editor import VideoFileClip, concatenate_videoclips
from models.video_editor import Range

async def transform_video_to_audio(path_target: str,path_dest:str):
    video = VideoFileClip(path_target)
    video.audio.write_audiofile(path_dest)

async def cut_video_by_ranges(video_path: str, rangesConfig : [Range], unique_id_gen: str): 
    general_clip = VideoFileClip(video_path)
    file_names = []

    for index, rangeConfig in enumerate(rangesConfig):
        subclip = general_clip.subclip(rangeConfig["start"],rangeConfig["end"])
        file_name = f"zip_files/{unique_id_gen}_cut_{index}.mp4"
        subclip.write_videofile(file_name)
        file_names.append(file_name)

    return file_names

async def remove_parts_from_video(video_path: str, rangesConfig : [Range], unique_id_gen: str):
    general_clip = VideoFileClip(video_path)
    ranges_got: [Range] = []
    subclips = []

    for index, rangeConfig in enumerate(rangesConfig):
        start = 0 if index == 0 else rangeConfig[index-1]["end"]
        end = rangeConfig["start"]

        if index == 0 and start == 0:
            continue
        if start == end:
            continue

        if index == 0 and start != 0:
            start = 0

        ranges_got.append({"start":start,"end":end})
    
    ranges_got.append({
        "start": rangesConfig[-1]["end"],
        "end": None
    })

    for range_got in ranges_got:
        subclip = None
        if range_got["end"] != None:
            subclip = general_clip.subclip(range_got["start"],range_got["end"])
        else:
            subclip = general_clip.subclip(range_got["start"])
        if subclip == None:
            continue
        
        subclips.append(subclip)

    final_clip = concatenate_videoclips(subclips)
    file_name = f"zip_files/{unique_id_gen}_remove_{index}.mp4"

    final_clip.write_videofile(file_name)

    return file_name