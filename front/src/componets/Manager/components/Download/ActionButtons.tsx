import { ProgressBarWrapper } from '@/componets/ProgressWrapper/ProgressWrapper';
import { Button } from '@/componets/ui/Button';
import { FC } from 'react';

export interface IActionButtons {
  operationId: string;
  onDownload: () => void;
}
export const ActionButtons: FC<IActionButtons> = ({
  operationId,
  onDownload,
}) => {
  return (
    <ProgressBarWrapper operationId={operationId} eventName="SINGLE">
      <Button onClick={onDownload}>Download</Button>
    </ProgressBarWrapper>
  );
};
