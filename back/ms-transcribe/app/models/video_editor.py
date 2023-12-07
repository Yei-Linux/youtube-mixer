from pydantic import BaseModel as PydanticBaseModel

class BaseModel(PydanticBaseModel):
    class Config:
        arbitrary_types_allowed = True

class Range:
    start: int
    end: int
class VideoEditorRequest(BaseModel):
    rangeConfig: [Range] = []
    type: str