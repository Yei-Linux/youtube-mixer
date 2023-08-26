import { RequiredNonNullableObject } from './index';
import ytdl from 'ytdl-core';

type videFormatRequired = RequiredNonNullableObject<ytdl.videoFormat>;
export type TQuality =
  | videFormatRequired['audioQuality']
  | videFormatRequired['qualityLabel'];

export type TExtension = 'mp4' | 'mp3';

export interface IDownloadYt {
  ytUrl: string;
  extension: TFormatsGrouped;
  itag: number;
}
export type TGetStream = RequiredNonNullableObject<IDownloadYt> & {
  ytdlUserPath: string;
};

export interface INiceFormat {
  audioQuality?: videFormatRequired['audioQuality'];
  videoQuality?: videFormatRequired['qualityLabel'];
  itag: number;
  size?: string;
  url: string;
  operationId: string;
}

export type TFormatsGrouped = TExtension | 'mp4WithoutAudio';
export interface IMetaVideoInfo {
  src: string;
  alt: string;
  videoTitle: string;
  videoDuration: string;
  url: string;
  formatsGrouped?: Record<TFormatsGrouped, INiceFormat[]>;
}
