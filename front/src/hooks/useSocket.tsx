import { BASE_PATH_EXPRESS } from '@/helpers/data';
import { useYtVideoStore } from '@/store';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

export const useSocket = () => {
  const userId = useYtVideoStore((store) => store.userId);
  const setSocket = useYtVideoStore((store) => store.setSocket);

  useEffect(() => {
    const socket = io(BASE_PATH_EXPRESS);
    socket.emit('connectInit', userId);
    setSocket(socket);
  }, []);
};
