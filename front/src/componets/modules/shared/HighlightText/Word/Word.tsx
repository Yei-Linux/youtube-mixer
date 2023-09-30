import classNames from 'classnames';
import { FC } from 'react';

export interface IWordComponent {
  wordContent: string;
  id: string;
  className?: string;
  onMouseOver?: () => void;
  onMouseDown?: () => void;
  onClick?: () => void;
}

export const Word: FC<IWordComponent> = ({
  id,
  wordContent,
  onMouseDown,
  onMouseOver,
  onClick,
  className,
}) => {
  return (
    <span
      id={id}
      style={{
        userSelect: 'none',
      }}
      className={classNames('pr-2', className)}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      onClick={onClick}
    >
      {wordContent}
    </span>
  );
};
