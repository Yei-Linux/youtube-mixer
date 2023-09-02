import { transformPLaylistToUIPlaylist } from '../helpers/data';
import { getYtMixList } from '../helpers/ytdl';

export const getPlayList = async (baseVideoId: string, listId: string) => {
  if (!listId) throw new Error('ListId was not passed.');
  if (!baseVideoId) throw new Error('BaseVideoId was not passed.');

  const playList = await getYtMixList(baseVideoId, listId);
  const playlistUI = transformPLaylistToUIPlaylist(playList);

  return playlistUI;
};
