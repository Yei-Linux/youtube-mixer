import { FormEvent } from 'react';

export const usePlaylist = () => {
  const getValidPlaylistId = (playlistSerch?: string) => {
    if (!playlistSerch) throw new Error('Playlist search should be filled');

    const searchParams = new URLSearchParams(playlistSerch);
    const listParam = searchParams.get('list');

    return listParam ?? playlistSerch;
  };

  const handleMixPlaylist = (e: FormEvent<HTMLFormElement>) => {
    const dataForm = new FormData(e.target as HTMLFormElement);
    const playlistSearch = dataForm.get('search_pl_input')?.toString();

    try {
      const playListId = getValidPlaylistId(playlistSearch);
    } catch (error) {}
  };

  return { handleMixPlaylist };
};
