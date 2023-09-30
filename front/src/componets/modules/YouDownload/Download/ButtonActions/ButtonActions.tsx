import { ProgressBarWrapper } from '@/componets/modules/shared/ProgressWrapper/ProgressWrapper';
import { Button } from '@/componets/ui/Button';
import { FC } from 'react';

export interface IButtonActions {
  operationId: string;
  onDownload: () => void;
}
export const ButtonActions: FC<IButtonActions> = ({
  operationId,
  onDownload,
}) => {
  return (
    <ProgressBarWrapper operationId={operationId} eventName="SINGLE">
      <Button onClick={onDownload}>Download</Button>
    </ProgressBarWrapper>
  );
};
