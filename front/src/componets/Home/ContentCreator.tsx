import { useState } from 'react';
import { DragUI, IFilesDroped } from '../ui/DragUI';
import { ProgressBar } from '../ui/ProgressBar';
import { Button } from '../ui/Button';

export const ContentCreator = () => {
  const [files, setFiles] = useState<IFilesDroped[]>([]);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);

  const handleChangeFiles = (filesChanged: IFilesDroped[]) => {
    setFiles(filesChanged);
  };

  const handleStartUploadingVideo = () => {
    setIsUploadingVideo(true);
  };

  return (
    <div className="flex flex-col gap-14 justify-center items-center h-full max-w-[800px] m-auto">
      <DragUI files={files} onChange={handleChangeFiles} />

      {!!files.length && (
        <div className="w-full p-4 flex flex-col gap-3">
          {!isUploadingVideo && (
            <div className="flex flex-col justify-center gap-3">
              <Button onClick={handleStartUploadingVideo}>
                Load Your Video
              </Button>
            </div>
          )}
          {isUploadingVideo && (
            <div className="flex flex-col gap-3">
              <p>Reading File:</p>
              <ProgressBar percent={30} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
