import {
  IRemoveSectionsFromVideosRequest,
  removeSectionsFromVideos,
} from '@/services';
import { MutableRefObject } from 'react';

export const useRemoveVideoSections = () => {
  const handleFetchRemoveVideoSections = async (
    req: IRemoveSectionsFromVideosRequest,
    videoRef: MutableRefObject<HTMLVideoElement | null>
  ) => {
    if (!videoRef.current?.src) return;

    try {
      const resVideo = await fetch(videoRef.current?.src);
      const mediaBlob = await resVideo.blob();
      const myFile = new File([mediaBlob], 'demo.mp4', { type: 'video/mp4' });

      const response = await removeSectionsFromVideos(req, myFile);
      const blobRes = new Blob([response]);
      const blobURL = URL.createObjectURL(blobRes);

      if (!blobURL || !videoRef.current) return;

      videoRef.current.src = blobURL;
    } catch (error) {}
  };

  return { handleFetchRemoveVideoSections };
};
