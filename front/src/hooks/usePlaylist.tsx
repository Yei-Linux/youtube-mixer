import { IPLayListVideo } from '@/componets/Manager/components/Playlist/List';
import { getYtPlaylist } from '@/services/playlist-mix';
import { FormEvent, useState } from 'react';

export const usePlaylist = () => {
  const [playlistVideosInfo, setPlayListVideosInfo] = useState<
    IPLayListVideo[]
  >([]);

  const getValidPlaylistId = (playlistSerch?: string) => {
    if (!playlistSerch) throw new Error('Playlist search should be filled');

    const searchParams = new URLSearchParams(playlistSerch);
    const baseVideoId = searchParams.get('v');
    const listId = searchParams.get('list');
    const indexVideo = searchParams.get('index');
    console.log('test', baseVideoId, listId, indexVideo);

    if (!listId || !baseVideoId) throw new Error('Invalid parameters');

    return { baseVideoId, listId };
  };

  const handleMixPlaylist = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataForm = new FormData(e.target as HTMLFormElement);
    const playlistSelected = dataForm.entries();

    try {
      console.log('test', playlistSelected);
    } catch (error) {}
  };

  const handleGetPlaylistById = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataForm = new FormData(e.target as HTMLFormElement);
    const playlistSearch = dataForm.get('search_pl_input')?.toString();

    try {
      const listParams = getValidPlaylistId(playlistSearch);
      const playlistVideos = await getYtPlaylist(listParams);
      setPlayListVideosInfo(playlistVideos);
    } catch (error) {
      console.error(error);
    }
  };

  return { playlistVideosInfo, handleMixPlaylist, handleGetPlaylistById };
};
