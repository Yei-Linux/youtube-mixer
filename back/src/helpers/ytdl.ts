import ytdl from 'ytdl-core';
import internal from 'node:stream';
import fs from 'fs';
import { filterByExtension } from './data';
import { TGetStream } from '../types/conversion';

export const getYtInfo = async (ytUrl: string) => {
  const response = await ytdl.getInfo(ytUrl);
  return response;
};

const filterYTDLVideo =
  (moreOptions: Omit<TGetStream, 'ytUrl' | 'ytdlUserPath'>) =>
  (format: ytdl.videoFormat) => {
    const match = filterByExtension(format, moreOptions.itag)[
      moreOptions.extension
    ];

    return match;
  };

export const getYtbStream = ({
  ytUrl,
  ytdlUserPath,
  ...moreOptions
}: TGetStream): Promise<internal.Readable> => {
  //Ref: https://nodejs.org/api/stream.html#class-streamreadable
  return new Promise((resolve, reject) => {
    const ytVideoInternalReadable = ytdl(ytUrl, {
      filter: filterYTDLVideo(moreOptions),
    });

    ytVideoInternalReadable.on('error', (error) => {
      reject(Error('Error getting yt video: ' + error.message));
    });

    ytVideoInternalReadable.on(
      'progress',
      (chunkLength, downloaded, total) => {}
    );

    ytVideoInternalReadable.pipe(
      fs
        .createWriteStream(ytdlUserPath)
        .on('open', () => {
          console.log('Downloading Video');
        })
        .on('finish', async () => {
          console.log('YTDL Downloaded completed');
          resolve(ytVideoInternalReadable);
        })
        .on('error', async (error) => {
          reject(Error('Error getting stream first part: ' + error.message));
        })
    );
  });
};
