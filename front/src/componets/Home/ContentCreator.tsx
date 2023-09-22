import { useState } from 'react';
import { DragUI, IFilesDroped } from '../ui/DragUI';
import { useTranscript } from '@/hooks';
import { StepLoadVideo } from '../Manager/components/ContentCreator/StepLoadVideo';
import { VideEditor } from '../Manager/components/ContentCreator/StepVideoEditor';
import classNames from 'classnames';

export const ContentCreator = () => {
  const [files, setFiles] = useState<IFilesDroped[]>([]);
  const [step, setStep] = useState<'drag' | 'process' | 'editor'>('drag');
  const { handleTranscript, isProcessing } = useTranscript();

  const handleChangeFiles = (filesChanged: IFilesDroped[]) => {
    setFiles(filesChanged);
    setStep('process');
  };

  const handlePreTranscript = async () => {
    const isSuccess = await handleTranscript(files[0].file);
    if (!isSuccess) return;
    setStep('editor');
  };

  return (
    <div
      className={classNames(
        'flex flex-col gap-14 justify-center items-center h-full m-auto',
        {
          'max-w-[800px]': step !== 'editor',
        }
      )}
    >
      {['drag', 'process'].includes(step) && (
        <DragUI files={files} onChange={handleChangeFiles} />
      )}
      {step === 'process' && !!files.length && (
        <StepLoadVideo
          isProcessing={isProcessing}
          handleTranscript={handlePreTranscript}
        />
      )}
      {step === 'editor' && !!files.length && (
        <VideEditor video={files[0].file} />
      )}
    </div>
  );
};
