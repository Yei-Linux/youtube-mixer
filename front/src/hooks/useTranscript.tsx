import { transcriptVideo } from '@/services';
import { useYtVideoStore } from '@/store';
import { useState } from 'react';

export const useTranscript = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const setTranscription = useYtVideoStore((store) => store.setTranscription);

  const handleTranscript = async (file: File) => {
    setIsProcessing(true);
    try {
      const res = await transcriptVideo(file);
      setTranscription(res.data);
      setIsProcessing(false);
      return true;
    } catch (error) {
      setIsProcessing(false);
      console.error((error as Error).message);
      return false;
    }
  };

  return { handleTranscript, isProcessing };
};
