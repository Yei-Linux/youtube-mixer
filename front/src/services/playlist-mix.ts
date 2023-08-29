import { IPLayListVideo } from '@/componets/Manager/components/Playlist/List';
import { BASE_PATH_EXPRESS } from '@/helpers/data';

interface IYtPlaylistparams {
  baseVideoId: string;
  listId: string;
}

export const getYtPlaylist = async ({
  baseVideoId,
  listId,
}: IYtPlaylistparams): Promise<IPLayListVideo[]> => {
  try {
    const response = await fetch(
      `${BASE_PATH_EXPRESS}/api/youtube-mix-playlist?${new URLSearchParams({
        baseVideoId,
        listId,
      })}`
    );
    const data = await response.json();
    return data?.playListVideos;
  } catch (error) {
    throw new Error('Error: ', (error as any).message);
  }
};
