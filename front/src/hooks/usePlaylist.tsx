import { IPLayListVideo } from '@/componets/Manager/components/Playlist/List';
import { getYtPlaylist } from '@/services/playlist-mix';
import { useYtVideoStore } from '@/store';
import { FormEvent, useState } from 'react';

export const usePlaylist = () => {
  const playlistVideosInfo = useYtVideoStore((store) => store.playlistSearched);

  const handleMixPlaylist = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataForm = new FormData(e.target as HTMLFormElement);
    const playlistSelected = dataForm.entries();

    try {
      console.log('test', playlistSelected);
    } catch (error) {}
  };

  return { playlistVideosInfo, handleMixPlaylist };
};
