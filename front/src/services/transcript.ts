import { BASE_PATH_MS_TRANSCRIPT } from '@/helpers/data';
import { ITranscriptionResponse } from '@/types/transcription';

export const transcriptVideo = async (
  file: File
): Promise<ITranscriptionResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${BASE_PATH_MS_TRANSCRIPT}/transcribe`, {
      body: formData,
      method: 'POST',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error while transcribing the video');
  }
};
