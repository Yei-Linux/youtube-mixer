import { ButtonHTMLAttributes, FC, MouseEventHandler } from 'react';

type TButtonClick = MouseEventHandler;
export interface IButton {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  children: React.ReactNode;
  onClick?: TButtonClick;
}

export const Button: FC<IButton> = ({ children, onClick, type = 'button' }) => (
  <button
    type={type}
    onClick={onClick}
    className="bg-blue-500 text-white py-2 px-4 text-sm rounded-full"
  >
    {children}
  </button>
);
