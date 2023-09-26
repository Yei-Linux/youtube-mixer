import {
  IRemoveSectionsFromVideosRequest,
  highlightsFromVideo,
} from '@/services';

export const useGenerateHighlights = () => {
  const handleFetchGenerateHighlights = async (
    req: IRemoveSectionsFromVideosRequest
  ) => {
    try {
      const response = await highlightsFromVideo(req);
      const blobURL = URL.createObjectURL(response);
      console.log('test', blobURL);
    } catch (error) {}
  };

  return { handleFetchGenerateHighlights };
};
