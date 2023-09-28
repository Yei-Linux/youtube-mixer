from moviepy.editor import VideoFileClip, concatenate_videoclips
from models.video_editor import Range

async def transform_video_to_audio(path_target: str,path_dest:str):
    video = VideoFileClip(path_target)
    video.audio.write_audiofile(path_dest)

async def cut_video_by_ranges(video_path: str, rangesConfig : [Range], unique_id_gen: str): 
    general_clip = VideoFileClip(video_path)
    file_names = []

    for index, rangeConfig in enumerate(rangesConfig):
        file_name = f"zip_files/{unique_id_gen}_cut_{index}.mp4"
        temp_file_name = f"zip_files/{unique_id_gen}_cut_{index}.m4a"

        subclip = general_clip.subclip(rangeConfig["start"],rangeConfig["end"])
        subclip.write_videofile(file_name,temp_audiofile=temp_file_name, remove_temp=True, codec="libx264", audio_codec="aac")

        file_names.append(file_name)

    return file_names

def handler_remove(rangesConfig : [Range]):
    ranges_got: [Range] = []

    if len(rangesConfig) == 0:
        return ranges_got

    for index, rangeConfig in enumerate(rangesConfig):
        start = 0 if index == 0 else rangesConfig[index-1]["end"]
        end = rangeConfig["start"]

        if index == 0 and rangeConfig["start"] == 0:
            continue
        if start == end:
            continue

        if index == 0 and rangeConfig["start"] != 0:
            start = 0

        ranges_got.append({"start":start,"end":end})
    
    ranges_got.append({
        "start": rangesConfig[-1]["end"],
        "end": None
    })

    return ranges_got

async def remove_parts_from_video(video_path: str, rangesConfig : [Range], unique_id_gen: str):
    ranges_got: [Range] = handler_remove(rangesConfig)

    general_clip = VideoFileClip(video_path)
    subclips = []

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
    file_name = f"zip_files/{unique_id_gen}_remove.mp4"

    final_clip.write_videofile(file_name)

    return file_name