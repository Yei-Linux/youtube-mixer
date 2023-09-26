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
  request: IRemoveSectionsFromVideosRequest
) => {
  try {
    const url = `${BASE_PATH_MS_TRANSCRIPT}/api/video-editor`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(request),
    });
    const reader = response.body?.getReader();
    if (!reader) throw new Error('Reader is null');

    const stream = await new ReadableStream({
      start(controller) {
        function pump(): any {
          return reader?.read().then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }
            controller.enqueue(value);
            return pump();
          });
        }

        return pump();
      },
    });
    const streamResponse = new Response(stream);
    const blob = await streamResponse.blob();
    return blob;
  } catch (error) {
    throw new Error('API Error: ' + (error as Error).message);
  }
};

export const highlightsFromVideo = async (
  request: IRemoveSectionsFromVideosRequest
) => {
  try {
    const url = `${BASE_PATH_MS_TRANSCRIPT}/api/video-editor`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(request),
    });
    const reader = response.body?.getReader();
    if (!reader) throw new Error('Reader is null');

    const stream = await new ReadableStream({
      start(controller) {
        function pump(): any {
          return reader?.read().then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }
            controller.enqueue(value);
            return pump();
          });
        }

        return pump();
      },
    });
    const streamResponse = new Response(stream);
    const blob = await streamResponse.blob();
    return blob;
  } catch (error) {
    throw new Error('API Error: ' + (error as Error).message);
  }
};
