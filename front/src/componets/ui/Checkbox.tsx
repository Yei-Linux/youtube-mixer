import classNames from 'classnames';
import { FC } from 'react';

export interface ICheckbox {
  value?: string;
  id: string;
  name: string;
  className?: string;
}

export const Checkbox: FC<ICheckbox> = ({ name, value, id, className }) => {
  return (
    <input
      type="checkbox"
      name={name}
      value={value}
      id={id}
      className={classNames(
        'w-4 h-4 bg-gray-100 border-gray-100 rounded-xl peer',
        className
      )}
    />
  );
};
