import { Button } from '@/componets/ui/Button';
import { ProgressBar } from '@/componets/ui/ProgressBar';
import { Spinner } from '@nextui-org/react';
import { FC } from 'react';

export interface IStepLoadVideo {
  isProcessing: boolean;
  handleTranscript: () => void;
}

export const StepLoadVideo: FC<IStepLoadVideo> = ({
  isProcessing,
  handleTranscript,
}) => {
  return (
    <div className="w-full p-4 flex flex-col gap-3">
      {!isProcessing && (
        <div className="flex flex-col justify-center gap-3">
          <Button onClick={handleTranscript}>Load Your Video</Button>
        </div>
      )}
      {isProcessing && (
        <div className="flex items-center flex-col gap-3">
          <Spinner color="primary" />
          <p>Reading File ... This process can take a few minutes</p>
        </div>
      )}
    </div>
  );
};
