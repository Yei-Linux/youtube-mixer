import { BASE_PATH_EXPRESS } from '@/helpers/data';
import { IDownloadYt } from '@/types/conversion';

export const downloadYtdlVideo = async (
  options: IDownloadYt,
  userId: string,
  operationId: string
) => {
  try {
    const url = `${BASE_PATH_EXPRESS}/api/youtube-download?${new URLSearchParams(
      JSON.parse(JSON.stringify(options))
    )}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        userId,
        operationId,
      },
    });
    const blob = await response.blob();
    return blob;
  } catch (error) {
    throw new Error('Error: ', (error as any).message);
  }
};
