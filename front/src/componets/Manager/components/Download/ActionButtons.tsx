import { Button } from '@/componets/ui/Button';
import { ProgressBar } from '@/componets/ui/ProgressBar';
import { useProgress } from '@/hooks';
import { FC, Fragment } from 'react';

export interface IActionButtons {
  operationId: string;
  onDownload: () => void;
}
export const ActionButtons: FC<IActionButtons> = ({
  operationId,
  onDownload,
}) => {
  const { progress, isStartProgress } = useProgress({ operationId });

  return (
    <Fragment>
      {isStartProgress ? (
        <div>
          <ProgressBar percent={progress} />
        </div>
      ) : (
        <Button onClick={onDownload}>Download</Button>
      )}
    </Fragment>
  );
};
