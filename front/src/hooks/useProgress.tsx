import { SocketEvents } from '@/constants';
import { useYtVideoStore } from '@/store';
import { useEffect, useState } from 'react';

export interface IUseProgress {
  operationId: string;
  eventName: 'SINGLE' | 'MIX';
}
export const useProgress = ({ operationId, eventName }: IUseProgress) => {
  const socket = useYtVideoStore((store) => store.socket);
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [isStartProgress, setIsStartProgress] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleEventDownloadSocket = (data: any): void => {
    if (data?.operationId !== operationId) return;

    const step = data?.step;
    if (!step) return;
    if (step !== 1 && step !== 2) return;

    setStep(step);

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
      setProgress(0);
      return;
    }
  };

  const handleEventFFmpegConversionSocket = (data: any): void => {
    if (data?.operationId !== operationId) return;

    const step = data?.step;
    if (!step) return;
    if (step !== 1 && step !== 2) return;

    setStep(step);

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
  };

  useEffect(() => {
    if (!socket) return;

    socket.on(SocketEvents[eventName].download, handleEventDownloadSocket);
    socket.on(
      SocketEvents[eventName].ffmpeg,
      handleEventFFmpegConversionSocket
    );
  }, [socket, operationId, eventName]);

  return { isStartProgress, progress, step };
};
