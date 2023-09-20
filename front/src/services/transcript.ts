import { BASE_PATH_MS_TRANSCRIPT } from '@/helpers/data';

export const transcriptVideo = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(BASE_PATH_MS_TRANSCRIPT, {
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};
