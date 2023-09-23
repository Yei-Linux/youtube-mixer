import { useRef, useEffect } from 'react';

export interface IUseVideoEditor {
  video: File;
}
export const useVideoEditor = ({ video }: IUseVideoEditor) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoRef?.current) return;

    const blob = URL.createObjectURL(video);
    videoRef.current.src = blob;
  }, [video, videoRef.current]);

  return { videoRef };
};
