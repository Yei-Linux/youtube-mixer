import { BASE_PATH_EXPRESS } from '@/helpers/data';
import { useYtVideoStore } from '../store';
import { isUrl } from '../validators';

export const useYoutubeSearch = () => {
  const metaInfo = useYtVideoStore((state) => state.metaInfo);
  const setMetaInfo = useYtVideoStore((state) => state.setMetaInfo);

  const handleSearch = async (url: string) => {
    const isSameUrl = metaInfo.url === url;
    if (isSameUrl || !url) return;

    const isValidUrl = isUrl(url);
    if (!isValidUrl) return;

    try {
      const response = await fetch(
        `${BASE_PATH_EXPRESS}/api/youtube-search?${new URLSearchParams({
          url,
        })}`
      );
      const data = await response.json();
      setMetaInfo(data);
    } catch (error) {
      console.error('Search API error: ', error);
    }
  };

  return { metaInfo, handleSearch };
};
