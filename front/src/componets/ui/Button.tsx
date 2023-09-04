import classNames from 'classnames';
import { ButtonHTMLAttributes, FC, MouseEventHandler } from 'react';

type TButtonClick = MouseEventHandler;
export interface IButton {
  id?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  children: React.ReactNode;
  onClick?: TButtonClick;
  className?: string;
}

export const Button: FC<IButton> = ({
  children,
  onClick,
  className,
  id,
  type = 'button',
}) => (
  <button
    id={id}
    type={type}
    onClick={onClick}
    className={classNames(
      'bg-[#848aff] text-[#ebeaea] py-2 px-4 text-sm rounded-full',
      className
    )}
  >
    {children}
  </button>
);
