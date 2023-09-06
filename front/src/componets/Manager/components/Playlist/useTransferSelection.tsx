import { useYtVideoStore } from '@/store';
import { useState, useEffect } from 'react';
import { IPLayListVideo } from './List';

export const useTransferSelection = () => {
  const playlistVideos = useYtVideoStore((store) => store.playlistSearched);
  const [nonSelectedVideos, setNonSelectedVideos] = useState<IPLayListVideo[]>(
    []
  );
  const [selectedVideos, setSelectedVideos] = useState<IPLayListVideo[]>([]);

  useEffect(() => {
    setNonSelectedVideos(playlistVideos);
    setSelectedVideos([]);
  }, [playlistVideos]);

  const handleAddSelectedVideos = (nonselectedform: HTMLFormElement) => {
    const formVideosNonSelected = Object.fromEntries(
      new FormData(nonselectedform)
    );

    const idsFormVideosChecked = Object.keys(formVideosNonSelected)
      .map((key) => key.split('__checkbox__nonselected')?.at(0))
      .filter((value) => value !== undefined) as string[];
    const playlistVideosChecked = playlistVideos.filter(({ videoId }) =>
      idsFormVideosChecked.includes(videoId)
    );
    const playlistVideosFiltered = nonSelectedVideos.filter(
      ({ videoId }) => !idsFormVideosChecked.includes(videoId)
    );

    setNonSelectedVideos(playlistVideosFiltered);
    setSelectedVideos((prev) => [...prev, ...playlistVideosChecked]);
  };

  const handleRemoveSelectedVideos = (selectedform: HTMLFormElement) => {
    const formVideosSelected = Object.fromEntries(new FormData(selectedform));

    const idsFormVideosChecked = Object.keys(formVideosSelected)
      .map((key) => key.split('__checkbox__selected')?.at(0))
      .filter((value) => value !== undefined) as string[];
    const playlistVideosChecked = playlistVideos.filter(({ videoId }) =>
      idsFormVideosChecked.includes(videoId)
    );
    const playlistVideosRest = selectedVideos.filter(
      ({ videoId }) => !idsFormVideosChecked.includes(videoId)
    );

    setNonSelectedVideos((prev) => [...prev, ...playlistVideosChecked]);
    setSelectedVideos(playlistVideosRest);
  };

  const decideWichOne = (e: any) => {
    e.preventDefault();
    const id = e.nativeEvent.submitter.id;
    if (!['add', 'remove'].includes(id)) return;
    const isForAdding = id === 'add';

    if (isForAdding) return handleAddSelectedVideos(e.target);
    return handleRemoveSelectedVideos(e.target);
  };

  return { decideWichOne, selectedVideos, nonSelectedVideos };
};
