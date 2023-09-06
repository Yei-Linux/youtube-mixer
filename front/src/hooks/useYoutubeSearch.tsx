import { getYtPlaylist } from '@/services/playlist-mix';
import { useYtVideoStore } from '../store';
import { isUrl } from '../validators';
import { searchYtdlVideo } from '@/services';
import { FormEvent } from 'react';

export const useYoutubeSearch = () => {
  const metaInfo = useYtVideoStore((state) => state.metaInfo);
  const setMetaInfo = useYtVideoStore((state) => state.setMetaInfo);
  const setPlaylistSearched = useYtVideoStore(
    (state) => state.setPlaylistSearched
  );
  const setMixingOperationId = useYtVideoStore(
    (state) => state.setMixingOperationId
  );

  const searchMultipleVideo = async (url: string) => {
    const urlRequest = new URL(url);
    const params = new URLSearchParams(urlRequest.search);
    const baseVideoId = params.get('v');
    const listId = params.get('list');

    if (!baseVideoId || !listId) return;

    const listParams = { baseVideoId, listId };
    try {
      const { playlistUI, operationId } = await getYtPlaylist(listParams);
      setPlaylistSearched(playlistUI);
      setMixingOperationId(operationId);
    } catch (error) {
      console.error('Search API error: ', error);
    }
  };

  const searchSingleVideo = async (url: string) => {
    const isSameUrl = metaInfo.url === url;
    if (isSameUrl) return;

    const urlRequest = new URL(url);
    const params = new URLSearchParams(urlRequest.search);
    const videoId = params.get('v');

    if (!videoId) return;

    const isValidUrl = isUrl(url);
    if (!isValidUrl) return;

    try {
      const response = await searchYtdlVideo(videoId);
      setMetaInfo(response);
    } catch (error) {
      console.error('Search API error: ', error);
    }
  };

  const handleSearch = async (
    e: FormEvent<HTMLFormElement>,
    multiple: boolean
  ) => {
    e.preventDefault();
    const searchForm = new FormData(e.target as HTMLFormElement);
    const url = searchForm.get('search_input')?.toString();

    if (!url) return;

    if (multiple) {
      await searchMultipleVideo(url);
      return;
    }

    await searchSingleVideo(url);
  };

  return { metaInfo, handleSearch };
};
