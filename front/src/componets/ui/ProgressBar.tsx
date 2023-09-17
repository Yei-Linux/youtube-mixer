import { FC } from 'react';

export interface IProgressBar {
  percent: number;
}

export const ProgressBar: FC<IProgressBar> = ({ percent }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className={`bg-[#848aff] h-2.5 rounded-full`}
        style={{
          width: `${percent ?? 0}%`,
        }}
      ></div>
    </div>
  );
};
