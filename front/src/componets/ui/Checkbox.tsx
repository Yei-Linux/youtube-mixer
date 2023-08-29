import { FC } from 'react';

export interface ICheckbox {
  value?: string;
  id: string;
  name: string;
}

export const Checkbox: FC<ICheckbox> = ({ name, value, id }) => {
  return (
    <input
      type="checkbox"
      name={name}
      value={value}
      id={id}
      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    />
  );
};
