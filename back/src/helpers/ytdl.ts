import ytdl from 'ytdl-core';
import internal from 'node:stream';
import fs from 'fs';
import { filterByExtension } from './data';
import { TExtension, TGetStream } from '../types/conversion';
import Miniget from 'miniget';
import { parseYTSourceText } from './parse';
import { IPlayList } from '../types/playlist';
import path from 'path';
import { HttpsProxyAgent } from 'https-proxy-agent';

export const getPlaylistYtbStream = async (
  videoIds: string[],
  ytdlUserBasePath: string,
  extension: TExtension
) => {
  try {
    for (let i = 0; i < videoIds.length; i++) {
      const videoId = videoIds[i];

      const ytUrl = `https://www.youtube.com/watch?${new URLSearchParams({
        v: videoId,
      })}`;
      const ytdlUserPath = path.join(
        ytdlUserBasePath,
        `ytdl_${videoId}.${extension}`
      );

      await getYtbStream({
        ytdlUserPath,
        ytUrl,
        extension,
        itag: 0,
      });
    }

    const fileNames = fs.readdirSync(ytdlUserBasePath);

    if (!fileNames.length)
      throw new Error('Youtube Files was not saved into directory');

    return fileNames;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getYtMixList = async (
  baseVideoId: string,
  listId: string
): Promise<IPlayList> => {
  try {
    const url = `https://www.youtube.com/watch?${new URLSearchParams({
      v: baseVideoId,
      list: listId,
    })}`;
    const response = (await Miniget(url, {}).text()).toString();

    const playListGeneral = parseYTSourceText(response, [
      '{"playlist":',
      ' {"playlist" : ',
      '{"playlist": ',
      ' {"playlist":',
    ]);
    const playList: IPlayList = playListGeneral?.contents;

    if (!playList || !playList?.length) {
      throw new Error('Playlist is empty.Probably json parsed was not correct');
    }

    return playList;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getYtInfo = async (ytUrl: string) => {
  try {
    const response = await ytdl.getInfo(ytUrl, {});
    return response;
  } catch (error) {
    console.log('test???', error);
    throw new Error('Error');
  }
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

    ytVideoInternalReadable.on('progress', (chunkLength, downloaded, total) => {
      console.log('Downloading progress: ', downloaded, total);
    });

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
