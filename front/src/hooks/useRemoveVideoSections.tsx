import {
  IRemoveSectionsFromVideosRequest,
  removeSectionsFromVideos,
} from '@/services';
import { MutableRefObject } from 'react';

export const useRemoveVideoSections = () => {
  const handleFetchRemoveVideoSections = async (
    req: IRemoveSectionsFromVideosRequest,
    videoRef: MutableRefObject<HTMLVideoElement | null>,
    originalVideo: File,
    onSuccess: () => void
  ) => {
    if (!videoRef.current?.src) return;

    try {
      const response = await removeSectionsFromVideos(req, originalVideo);
      const blobRes = new Blob([response]);
      const blobURL = URL.createObjectURL(blobRes);

      if (!blobURL || !videoRef.current) return;

      onSuccess();
      videoRef.current.src = blobURL;
    } catch (error) {}
  };

  return { handleFetchRemoveVideoSections };
};
