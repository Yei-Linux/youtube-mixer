import classNames from 'classnames';
import { FC } from 'react';

export interface IToopltipOptions {
  id?: string;
  top: number;
  left: number;
  isHidden: boolean;
  children: React.ReactNode;
}

export const ToopltipOptions: FC<IToopltipOptions> = ({
  id,
  top,
  left,
  isHidden,
  children,
}) => {
  return (
    <div
      id={id}
      className={classNames(
        'w-[120px] absolute bg-primary text-white p-2 text-xs rounded-lg hover:cursor-pointer',
        {
          hidden: isHidden,
        }
      )}
      style={{
        top,
        left,
      }}
    >
      <ul className="flex flex-col gap-1">{children}</ul>
    </div>
  );
};
