import { useYtVideoStore } from '@/store';
import { FC, useEffect, useRef } from 'react';

export interface IVideoEditor {
  video: File;
}

export const VideEditor: FC<IVideoEditor> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const transcription = useYtVideoStore((store) => store.transcription);

  useEffect(() => {
    if (!videoRef?.current) return;

    const blob = URL.createObjectURL(video);
    videoRef.current.src = blob;
  }, [video, videoRef.current]);

  return (
    <div className="flex justify-between gap-3 w-full">
      <div className="min-w-[50%]">
        <h4 className="font-bold">Video Transcription:</h4>
        <div>
          {transcription?.timeline.map(({ words }, indexParent) =>
            words.map(({ text }, index) => (
              <span key={`${indexParent}_${index}`}>{text}</span>
            ))
          )}
        </div>
      </div>
      <div className="min-w-[50%]">
        <video controls className="w-full" ref={videoRef} id="video" />
      </div>
    </div>
  );
};
