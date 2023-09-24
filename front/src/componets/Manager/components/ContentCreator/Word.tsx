import { IWord } from '@/types/transcription';
import classNames from 'classnames';
import { FC } from 'react';

export interface IWordComponent {
  word: IWord;
  id: string;
  className?: string;
  onMouseOver?: () => void;
  onMouseDown?: () => void;
  onClick?: () => void;
}

export const Word: FC<IWordComponent> = ({
  id,
  word,
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
      {word.text}
    </span>
  );
};
