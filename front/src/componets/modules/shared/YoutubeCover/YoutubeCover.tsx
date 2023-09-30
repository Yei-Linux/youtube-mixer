import classNames from 'classnames';
import Image from 'next/image';
import { FC } from 'react';

export interface IYoutubeCover {
  src: string;
  alt: string;
  videoTitle: string;
  videoDuration: string;
  titleClassname?: string;
  durationClassname?: string;
  metaDataClassname?: string;
  figureClassname?: string;
}

export const YoutubeCover: FC<IYoutubeCover> = ({
  src,
  alt,
  videoTitle,
  videoDuration,
  titleClassname,
  durationClassname,
  metaDataClassname,
  figureClassname,
}) => {
  return (
    <figure
      className={classNames(
        'rounded-md',
        'overflow-hidden',
        'max-w-[360px]',
        'bg-opacity-80 backdrop-blur-xl drop-shadow-lg',
        'bg-[#848aff]',
        'text-[#ebeaea]',
        'cursor-pointer',
        figureClassname
      )}
    >
      <Image src={src} alt={alt} width={360} height={150} />
      <div
        className={classNames(
          'w-full flex flex-col gap-3 p-3',
          metaDataClassname
        )}
      >
        <figcaption
          className={classNames(
            'flex gap-3',
            'text-sm',
            'text-bold',
            titleClassname
          )}
        >
          <span> 🎥 </span>
          <strong className="multiline-ellipsis">{videoTitle}</strong>
        </figcaption>
        <figcaption
          className={classNames('flex gap-3', 'text-sm', durationClassname)}
        >
          <span>🎬</span> <strong>{videoDuration}</strong>
        </figcaption>
      </div>
    </figure>
  );
};
