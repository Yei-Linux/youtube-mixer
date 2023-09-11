import ffmpeg from 'fluent-ffmpeg';
import nodePath from 'path';

import fs from 'fs';
import { TExtension } from '../types/conversion';
import {
  UPLOAD_PROGRESS_STEPTWO_MIX,
  UPLOAD_PROGRESS_STEPTWO_SINGLE,
} from '../constants/socket';

export const mergeStreams = async (
  extension: TExtension,
  downloadedUserPath: string,
  ytdlUserPaths: string[],
  socketInstance: any,
  operationId: string,
  ytdlUserPath: string
) => {
  socketInstance.emit(UPLOAD_PROGRESS_STEPTWO_MIX, {
    status: 'start',
    progressInfo: null,
    operationId,
    step: 2,
  });

  return new Promise((resolve, reject) => {
    const outputStream = fs.createWriteStream(downloadedUserPath);
    let ffmpegWithInputs = ffmpeg();

    ytdlUserPaths.map((path) => {
      const resultPath = nodePath.join(ytdlUserPath, path);
      ffmpegWithInputs.addInput(resultPath);
    });

    ffmpegWithInputs
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

        socketInstance.emit(UPLOAD_PROGRESS_STEPTWO_MIX, {
          status: 'progress',
          progressInfo,
          operationId,
          step: 2,
        });
      })
      .on('end', () => {
        socketInstance.emit(UPLOAD_PROGRESS_STEPTWO_MIX, {
          status: 'end',
          progressInfo: null,
          operationId,
          step: 2,
        });
        return resolve(outputStream);
      })
      .on('error', (err) => {
        socketInstance.emit(UPLOAD_PROGRESS_STEPTWO_MIX, {
          status: 'error',
          progressInfo: null,
          operationId,
          step: 2,
        });
        return reject(err);
      })
      .run();
  });
};

export const streamToExtension = async (
  extension: TExtension,
  downloadedUserPath: string,
  ytdlUserPath: string,
  socketInstance: any,
  operationId: string
): Promise<fs.WriteStream> => {
  socketInstance.emit(UPLOAD_PROGRESS_STEPTWO_SINGLE, {
    status: 'start',
    progressInfo: null,
    operationId,
    step: 2,
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

        socketInstance.emit(UPLOAD_PROGRESS_STEPTWO_SINGLE, {
          status: 'progress',
          progressInfo,
          operationId,
          step: 2,
        });
      })
      .on('end', () => {
        socketInstance.emit(UPLOAD_PROGRESS_STEPTWO_SINGLE, {
          status: 'end',
          progressInfo: null,
          operationId,
          step: 2,
        });
        return resolve(outputStream);
      })
      .on('error', (err) => {
        socketInstance.emit(UPLOAD_PROGRESS_STEPTWO_SINGLE, {
          status: 'error',
          progressInfo: null,
          operationId,
          step: 2,
        });
        return reject(err);
      })
      .run();
  });
};
