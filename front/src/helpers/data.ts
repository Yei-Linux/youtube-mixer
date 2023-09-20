import { TExtension, TFormatsGrouped } from '../types/conversion';

export const BASE_PATH_EXPRESS = 'http://localhost:3001';
export const BASE_PATH_MS_TRANSCRIPT = 'http://localhost:8000/api';

export const audioEquivalents = {
  AUDIO_QUALITY_LOW: 'Quality Low',
  AUDIO_QUALITY_MEDIUM: 'Quality Medium',
};

export const extensionEquivalents: Record<TFormatsGrouped, TExtension> = {
  mp3: 'mp3',
  mp4: 'mp4',
  mp4WithoutAudio: 'mp4',
};
