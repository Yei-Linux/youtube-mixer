import classNames from 'classnames';
import { FC } from 'react';

export interface IFormField {
  children: React.ReactNode;
  htmlFor: string;
  labelText: React.ReactNode;
  className?: string;
  labelClassName?: string;
}

export const FormField: FC<IFormField> = ({
  children,
  htmlFor,
  labelText,
  className,
  labelClassName,
}) => (
  <div className={className}>
    <label
      htmlFor={htmlFor}
      className={classNames(
        'block text-sm font-medium text-gray-900',
        labelClassName
      )}
    >
      {labelText}
    </label>
    {children}
  </div>
);
