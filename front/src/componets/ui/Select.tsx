import { ChangeEvent, FC } from 'react';

export interface ISelect {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}

interface IOption {
  value: string;
  children: React.ReactNode;
}
const Option = ({ children, value }: IOption) => (
  <option value={value}>{children}</option>
);

export const Select = ({ value, onChange, children }: ISelect) => {
  return (
    <select
      value={value}
      onChange={onChange}
      id="countries"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-0 block w-full p-2.5"
    >
      {children}
    </select>
  );
};

Select.Option = Option;
