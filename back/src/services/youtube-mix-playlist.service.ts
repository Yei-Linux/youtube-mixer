import { transformPLaylistToUIPlaylist } from '../helpers/data';
import { mergeStreams } from '../helpers/streams';
import { getYtMixList, getPlaylistYtbStream } from '../helpers/ytdl';
import { TExtension } from '../types/conversion';

export const getPlayList = async (baseVideoId: string, listId: string) => {
  if (!listId) throw new Error('ListId was not passed.');
  if (!baseVideoId) throw new Error('BaseVideoId was not passed.');

  const playList = await getYtMixList(baseVideoId, listId);
  const playlistUI = transformPLaylistToUIPlaylist(playList);

  return playlistUI;
};

export const mixPlayList = async (
  videoIds: string[],
  ytdlUserBasePath: string,
  downloaderUserPath: string,
  extension: TExtension,
  socketInstance: any,
  operationId: string
) => {
  if (!videoIds?.length)
    throw new Error('videoIds was not passed or is empty.');
  if (!ytdlUserBasePath)
    throw new Error('ytdlUserBasePath was not passed or is empty.');

  const ytdlUserPaths = await getPlaylistYtbStream(
    videoIds,
    ytdlUserBasePath,
    extension
  );
  await mergeStreams(
    extension,
    downloaderUserPath,
    ytdlUserPaths,
    socketInstance,
    operationId
  );
};
