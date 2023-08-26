import { useYtVideoStore } from '@/store';
import { useEffect, useState } from 'react';

export interface IUseProgress {
  operationId: string;
}
export const useProgress = ({ operationId }: IUseProgress) => {
  const socket = useYtVideoStore((store) => store.socket);
  const [isStartProgress, setIsStartProgress] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!socket) return;

    socket.on('uploadProgress', (data: any): void => {
      if (data?.operationId !== operationId) return;

      const status = data.status;
      const progressInfo = data.progressInfo;
      if (status === 'start') {
        setIsStartProgress(true);
        return;
      }
      if (status === 'progress') {
        progressInfo?.percent && setProgress(progressInfo?.percent);
        return;
      }
      if (['end', 'error'].includes(status)) {
        setIsStartProgress(false);
        setProgress(0);
        return;
      }
    });
  }, [socket, operationId]);

  return { isStartProgress, progress };
};
