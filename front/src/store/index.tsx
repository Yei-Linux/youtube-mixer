import { Socket } from 'socket.io-client';
import { IMetaVideoInfo } from '../types/conversion';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';

export interface IYtVideoStore {
  socket?: Socket<any, any>;
  userId: string;
  metaInfo: IMetaVideoInfo;
  setMetaInfo: (value: IMetaVideoInfo) => void;
  setSocket: (value: Socket<any, any>) => void;
}

export const useYtVideoStore = create<IYtVideoStore>((set) => ({
  userId: uuidv4(),
  metaInfo: {
    src: 'https://blog.rincondelvago.com/wp-content/themes/publisher/images/default-thumb/publisher-lg.png',
    alt: 'Youtube Cover',
    videoTitle: 'Here will be your video title',
    videoDuration: 'Here will be your video duration',
    url: '',
  },
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
