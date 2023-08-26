import ffmpeg from 'fluent-ffmpeg';

import fs from 'fs';
import { TExtension } from '../types/conversion';

export const streamToExtension = async (
  extension: TExtension,
  downloadedUserPath: string,
  ytdlUserPath: string,
  socketInstance: any,
  operationId: string
): Promise<fs.WriteStream> => {
  socketInstance.emit('uploadProgress', {
    status: 'start',
    progressInfo: null,
    operationId,
  });

  return new Promise((resolve, reject) => {
    const outputStream = fs.createWriteStream(downloadedUserPath);

    ffmpeg(ytdlUserPath)
      .format(extension)
      .output(downloadedUserPath)
      .on('progress', (progress) => {
        const progressInfo = {
          percent: Math.max(0, Math.round(+progress.percent)),
          time:
            progress.timemark[0] !== '-'
              ? progress.timemark.slice(0, 8)
              : '00:00:00',
        };

        socketInstance.emit('uploadProgress', {
          status: 'progress',
          progressInfo,
          operationId,
        });
      })
      .on('end', () => {
        socketInstance.emit('uploadProgress', {
          status: 'end',
          progressInfo: null,
          operationId,
        });
        return resolve(outputStream);
      })
      .on('error', (err) => {
        socketInstance.emit('uploadProgress', {
          status: 'error',
          progressInfo: null,
          operationId,
        });
        return reject(err);
      })
      .run();
  });
};
