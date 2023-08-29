import { useYtVideoStore } from '../store';
import { isUrl } from '../validators';
import { searchYtdlVideo } from '@/services';
import { FormEvent } from 'react';

export const useYoutubeSearch = () => {
  const metaInfo = useYtVideoStore((state) => state.metaInfo);
  const setMetaInfo = useYtVideoStore((state) => state.setMetaInfo);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchForm = new FormData(e.target as HTMLFormElement);
    const url = searchForm.get('search_input')?.toString();

    const isSameUrl = metaInfo.url === url;
    if (isSameUrl || !url) return;

    const isValidUrl = isUrl(url);
    if (!isValidUrl) return;

    try {
      const response = await searchYtdlVideo(url);
      setMetaInfo(response);
    } catch (error) {
      console.error('Search API error: ', error);
    }
  };

  return { metaInfo, handleSearch };
};
