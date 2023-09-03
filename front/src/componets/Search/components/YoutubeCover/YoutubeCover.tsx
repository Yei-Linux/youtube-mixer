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
      className={classNames('rounded-md', 'overflow-hidden', figureClassname)}
    >
      <Image src={src} alt={alt} width={360} height={150} />
      <div
        className={classNames(
          'w-full flex flex-col gap-3 p-3',
          metaDataClassname
        )}
      >
        <figcaption className={classNames(durationClassname)}>
          🎬 Duration: {videoDuration}
        </figcaption>
        <figcaption className={classNames(titleClassname)}>
          🎥 Title: {videoTitle}
        </figcaption>
      </div>
    </figure>
  );
};
