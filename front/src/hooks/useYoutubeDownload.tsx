import { BASE_PATH_EXPRESS, extensionEquivalents } from '../helpers/data';
import { IDownloadYt } from '../types/conversion';
import { downloadFile } from '../utils';

export const useYoutubeDownload = () => {
  const handleDownload = async (
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

      const newBlob = new Blob([blob]);
      const validExtension = extensionEquivalents[options.extension];
      downloadFile(newBlob, validExtension);
    } catch (error) {
      console.error('Donwload API error: ', error);
    }
  };

  return { handleDownload };
};
