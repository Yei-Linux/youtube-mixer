import { ChangeEvent, FC } from 'react';
import { Select as NextUISelect, SelectItem } from '@nextui-org/react';

export interface ISelect {
  value: string;
  onChange: (e: any) => void;
  children: any;
  label?: string;
}

interface IOption {
  value: string;
  children: any;
}
const Option = ({ children, value }: IOption) => (
  <SelectItem key={value} value={value}>
    {children}
  </SelectItem>
);

export const Select = ({ value, onChange, children, label = '' }: ISelect) => {
  return (
    <NextUISelect
      variant="flat"
      color="default"
      size="sm"
      selectedKeys={new Set([value])}
      onChange={onChange}
      label={label}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-0 block w-full p-2.5"
    >
      {children}
    </NextUISelect>
  );
};

Select.Option = SelectItem;
