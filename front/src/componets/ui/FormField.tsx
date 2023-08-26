import { FC } from 'react';

export interface IFormField {
  children: React.ReactNode;
  htmlFor: string;
  labelText: React.ReactNode;
}

export const FormField: FC<IFormField> = ({ children, htmlFor, labelText }) => (
  <div>
    <label
      htmlFor={htmlFor}
      className="block mb-2 text-sm font-medium text-gray-900"
    >
      {labelText}
    </label>
    {children}
  </div>
);
