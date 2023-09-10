import { IPLayListVideo } from '@/componets/Manager/components/Playlist/List';
import { BASE_PATH_EXPRESS } from '@/helpers/data';

interface IYtPlaylistparams {
  baseVideoId: string;
  listId: string;
}

interface IResponse {
  playlistUI: IPLayListVideo[];
  operationId: string;
}

export const getYtPlaylist = async ({
  baseVideoId,
  listId,
}: IYtPlaylistparams): Promise<IResponse> => {
  try {
    const response = await fetch(
      `${BASE_PATH_EXPRESS}/api/youtube-mix-playlist?${new URLSearchParams({
        baseVideoId,
        listId,
      })}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error: ', (error as any).message);
  }
};

export interface IMixPlaylist {
  baseVideoId: string;
}
export const mixPlayList = async (
  body: any,
  userId: string,
  operationId: string
) => {
  try {
    const url = `${BASE_PATH_EXPRESS}/api/youtube-mix-playlist`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        userId,
        operationId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const blob = await response.blob();
    return blob;
  } catch (error) {
    throw new Error('Error: ', (error as any).message);
  }
};
