from pydantic import BaseModel

class Range:
    start: int
    end: int
class VideoEditorRequest(BaseModel):
    rangeConfig: [Range] = []
    type: str