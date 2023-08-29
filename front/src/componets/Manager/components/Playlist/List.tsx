import { YoutubeCover } from '@/componets/Search/components/YoutubeCover/YoutubeCover';
import { Checkbox } from '@/componets/ui/Checkbox';
import { FormField } from '@/componets/ui/FormField';
import { FC } from 'react';

export interface IPLayListVideo {
  url: string;
  bestThumbnail: string;
  title: string;
  duration: string;
}

export interface IList {
  playListVideos: IPLayListVideo[];
}

export const List: FC<IList> = ({ playListVideos }) => {
  return (
    <div>
      {playListVideos?.map(({ url, bestThumbnail, title, duration }) => (
        <div className="flex justify-between" key={url}>
          <FormField
            htmlFor={`${url}__checkbox`}
            labelText={
              <YoutubeCover
                src={bestThumbnail}
                videoTitle={title}
                videoDuration={duration}
                alt={title}
              />
            }
          >
            <Checkbox id={`${url}__checkbox`} name={`${url}__checkbox`} />
          </FormField>
        </div>
      ))}
    </div>
  );
};
