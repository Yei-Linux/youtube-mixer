import classNames from 'classnames';
import { FC } from 'react';

export interface ISelectionOption {
  top: number;
  left: number;
  isHidden: boolean;
  onAddToHightLight?: () => void;
  onDeletePhraseOrWord?: () => void;
}

export const SelectionOption: FC<ISelectionOption> = ({
  top,
  left,
  isHidden,
  onAddToHightLight,
  onDeletePhraseOrWord,
}) => {
  return (
    <div
      className={classNames(
        'absolute bg-primary text-white p-2 text-xs rounded-lg hover:cursor-pointer',
        {
          hidden: isHidden,
        }
      )}
      style={{
        top,
        left,
      }}
    >
      <ul className="flex flex-col gap-1">
        <li className="" onClick={onAddToHightLight}>
          Add to Highlights
        </li>
        <li className="" onClick={onDeletePhraseOrWord}>
          Delete phrase or words
        </li>
      </ul>
    </div>
  );
};
