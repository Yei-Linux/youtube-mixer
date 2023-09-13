export const UPLOAD_PROGRESS_STEPONE_SINGLE = 'uploadProgressDownloadSingle';
export const UPLOAD_PROGRESS_STEPTWO_SINGLE = 'uploadProgressFFmpegSingle';

export const UPLOAD_PROGRESS_STEPONE_MIX = 'uploadProgressDownloadMix';
export const UPLOAD_PROGRESS_STEPTWO_MIX = 'uploadProgressFFmpegMix';

export const SocketEvents = {
  SINGLE: {
    download: UPLOAD_PROGRESS_STEPONE_SINGLE,
    ffmpeg: UPLOAD_PROGRESS_STEPTWO_SINGLE,
  },
  MIX: {
    download: UPLOAD_PROGRESS_STEPONE_MIX,
    ffmpeg: UPLOAD_PROGRESS_STEPTWO_MIX,
  },
};
