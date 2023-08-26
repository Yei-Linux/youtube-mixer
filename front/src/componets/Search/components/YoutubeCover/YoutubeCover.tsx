import Image from 'next/image';
import { FC } from 'react';

export interface IYoutubeCover {
  src: string;
  alt: string;
  videoTitle: string;
  videoDuration: string;
}

export const YoutubeCover: FC<IYoutubeCover> = ({
  src,
  alt,
  videoTitle,
  videoDuration,
}) => {
  return (
    <figure className="flex flex-col gap-3 items-center">
      <Image src={src} alt={alt} width={300} height={150} />
      <figcaption className="text-center">🎥 Title: {videoTitle}</figcaption>
      <figcaption className="text-center">
        🎬 Duration: {videoDuration}
      </figcaption>
    </figure>
  );
};
