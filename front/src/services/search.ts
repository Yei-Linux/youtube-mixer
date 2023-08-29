import { BASE_PATH_EXPRESS } from '@/helpers/data';

export const searchYtdlVideo = async (url: string) => {
  try {
    const response = await fetch(
      `${BASE_PATH_EXPRESS}/api/youtube-search?${new URLSearchParams({
        url,
      })}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error: ', (error as any).message);
  }
};
