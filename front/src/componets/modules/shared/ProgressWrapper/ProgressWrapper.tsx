import { useProgress } from '@/hooks';
import { FC, Fragment } from 'react';
import { ProgressBar } from '../../../ui/ProgressBar';

export interface IProgressBarWrapper {
  children: React.ReactNode;
  operationId: string;
  eventName: 'SINGLE' | 'MIX';
}
export const ProgressBarWrapper: FC<IProgressBarWrapper> = ({
  children,
  operationId,
  eventName,
}) => {
  const { progress, isStartProgress, step } = useProgress({
    operationId,
    eventName,
  });

  return (
    <Fragment>
      {isStartProgress ? (
        <div>
          <span>{step}/2</span>
          <ProgressBar percent={progress} />
        </div>
      ) : (
        children
      )}
    </Fragment>
  );
};
