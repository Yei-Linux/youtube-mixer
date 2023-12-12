import { TExtension, TFormatsGrouped } from '../types/conversion';

export const BASE_PATH_EXPRESS = process.env['NEXT_PUBLIC_MS_YT_MIXER'];
export const BASE_PATH_MS_TRANSCRIPT =
  process.env['NEXT_PUBLIC_MS_TRANSCRIBE'] + '/api';

export const audioEquivalents = {
  AUDIO_QUALITY_LOW: 'Quality Low',
  AUDIO_QUALITY_MEDIUM: 'Quality Medium',
};

export const extensionEquivalents: Record<TFormatsGrouped, TExtension> = {
  mp3: 'mp3',
  mp4: 'mp4',
  mp4WithoutAudio: 'mp4',
};
