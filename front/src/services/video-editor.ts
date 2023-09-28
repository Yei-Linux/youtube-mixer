import { BASE_PATH_MS_TRANSCRIPT } from '@/helpers/data';

export interface IRangeConfig {
  start: number;
  end: number;
}
export interface IRemoveSectionsFromVideosRequest {
  rangeConfig: IRangeConfig[];
  type: 'remove' | 'cut';
}
export const removeSectionsFromVideos = async (
  request: IRemoveSectionsFromVideosRequest,
  file: File
) => {
  try {
    const url = `${BASE_PATH_MS_TRANSCRIPT}/video-editor`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('request_str', JSON.stringify(request));

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    const blob = await response.blob();

    return blob;
  } catch (error) {
    throw new Error('API Error: ' + (error as Error).message);
  }
};

export const highlightsFromVideo = async (
  request: IRemoveSectionsFromVideosRequest,
  file: File
) => {
  try {
    const url = `${BASE_PATH_MS_TRANSCRIPT}/video-editor`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('request_str', JSON.stringify(request));

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    const blob = await response.blob();

    return blob;
  } catch (error) {
    throw new Error('API Error: ' + (error as Error).message);
  }
};
