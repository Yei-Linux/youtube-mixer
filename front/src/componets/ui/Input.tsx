import { ChangeEvent, FC } from 'react';

export type TInputChangeEvent = ({
  target,
}: ChangeEvent<HTMLInputElement>) => void;

export interface IInput {
  id?: string;
  placeholder: string;
  value: string;
  onChange?: TInputChangeEvent;
}

export const Input: FC<IInput> = ({ id, placeholder, value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    className="border outline-0 text-gray border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5"
    placeholder={placeholder}
    id={id}
    required
  />
);
