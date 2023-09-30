import { Socket } from 'socket.io-client';
import { IMetaVideoInfo } from '../types/conversion';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { IPLayListVideo } from '@/componets/modules/YouMixDownload/Playlist/List';
import { ITranscriptionDataResponse } from '@/types/transcription';

export const placeholderMultipleVideo = [
  {
    videoUrl: '',
    title: 'Here will be your video title',
    videoId: '0',
    thumbnailOverlays: 'Here will be your video duration',
    thumbnail: {
      url: 'https://blog.rincondelvago.com/wp-content/themes/publisher/images/default-thumb/publisher-lg.png',
      width: '300px',
      height: '300px',
    },
  },
];

export interface IYtVideoStore {
  socket?: Socket<any, any>;
  userId: string;
  mixingOperationId: string;
  playlistSearched: IPLayListVideo[];
  metaInfo: IMetaVideoInfo;
  transcription?: ITranscriptionDataResponse;
  setPlaylistSearched: (value: IPLayListVideo[]) => void;
  setMetaInfo: (value: IMetaVideoInfo) => void;
  setSocket: (value: Socket<any, any>) => void;
  setMixingOperationId: (value: string) => void;
  setTranscription: (value: ITranscriptionDataResponse) => void;
}

export const useYtVideoStore = create<IYtVideoStore>((set) => ({
  userId: uuidv4(),
  mixingOperationId: '',
  playlistSearched: [],
  metaInfo: {
    src: 'https://blog.rincondelvago.com/wp-content/themes/publisher/images/default-thumb/publisher-lg.png',
    alt: 'Youtube Cover',
    videoTitle: 'Here will be your video title',
    videoDuration: 'Here will be your video duration',
    url: '',
  },
  setTranscription: (value: ITranscriptionDataResponse) =>
    set((state: IYtVideoStore) => ({
      ...state,
      transcription: value,
    })),
  setMixingOperationId: (value: string) =>
    set((state: IYtVideoStore) => ({
      ...state,
      mixingOperationId: value,
    })),
  setPlaylistSearched: (value: IPLayListVideo[]) =>
    set((state: IYtVideoStore) => ({
      ...state,
      playlistSearched: value,
    })),
  setMetaInfo: (value: IMetaVideoInfo) =>
    set((state: IYtVideoStore) => ({
      ...state,
      metaInfo: value,
    })),
  setSocket: (value: Socket<any, any>) =>
    set((state: IYtVideoStore) => ({
      ...state,
      socket: value,
    })),
}));
