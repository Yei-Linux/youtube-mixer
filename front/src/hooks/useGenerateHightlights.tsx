import {
  IRemoveSectionsFromVideosRequest,
  highlightsFromVideo,
} from '@/services';
import { downloadFile } from '@/utils';
import { MutableRefObject } from 'react';

export const useGenerateHighlights = () => {
  const handleFetchGenerateHighlights = async (
    req: IRemoveSectionsFromVideosRequest,
    videoRef: MutableRefObject<HTMLVideoElement | null>,
    onSuccess: () => void
  ) => {
    if (!videoRef.current?.src) return;

    try {
      const resVideo = await fetch(videoRef.current?.src);
      const mediaBlob = await resVideo.blob();
      const myFile = new File([mediaBlob], 'demo.mp4', { type: 'video/mp4' });

      const response = await highlightsFromVideo(req, myFile);
      const blobRes = new Blob([response]);

      downloadFile(blobRes, 'zip');
      onSuccess();
    } catch (error) {}
  };

  return { handleFetchGenerateHighlights };
};
