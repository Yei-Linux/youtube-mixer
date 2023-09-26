import {
  IRemoveSectionsFromVideosRequest,
  removeSectionsFromVideos,
} from '@/services';

export const useRemoveVideoSections = () => {
  const handleFetchRemoveVideoSections = async (
    req: IRemoveSectionsFromVideosRequest
  ) => {
    try {
      const response = await removeSectionsFromVideos(req);
      const blobURL = URL.createObjectURL(response);
      console.log('test', blobURL);
    } catch (error) {}
  };

  return { handleFetchRemoveVideoSections };
};
