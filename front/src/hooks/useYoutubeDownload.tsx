import { downloadYtdlVideo } from '@/services';
import { extensionEquivalents } from '../helpers/data';
import { IDownloadYt } from '../types/conversion';
import { downloadFile } from '../utils';

export const useYoutubeDownload = () => {
  const handleDownload = async (
    options: IDownloadYt,
    userId: string,
    operationId: string
  ) => {
    try {
      const blob = await downloadYtdlVideo(options, userId, operationId);
      const newBlob = new Blob([blob]);
      const validExtension = extensionEquivalents[options.extension];
      downloadFile(newBlob, validExtension);
    } catch (error) {
      console.error('Donwload API error: ', error);
    }
  };

  return { handleDownload };
};
