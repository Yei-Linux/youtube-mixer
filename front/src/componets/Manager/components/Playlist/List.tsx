import { Checkbox } from '@/componets/ui/Checkbox';
import { FormField } from '@/componets/ui/FormField';
import { FC } from 'react';

export interface IPLayListVideo {
  videoUrl: string;
  thumbnail: {
    url: string;
    width: string;
    height: string;
  };
  title: string;
  videoId: string;
  thumbnailOverlays: string;
}

export interface IList {
  playListVideos: IPLayListVideo[];
}

export const List: FC<IList> = ({ playListVideos }) => {
  return (
    <div className="max-h-[500px] overflow-auto">
      {playListVideos?.map(
        ({ title, thumbnailOverlays, thumbnail, videoId, videoUrl }) => (
          <div className="flex justify-between" key={videoId}>
            <FormField htmlFor={`${videoId}__checkbox`} labelText={title}>
              <Checkbox
                id={`${videoId}__checkbox`}
                name={`${videoId}__checkbox`}
              />
            </FormField>
          </div>
        )
      )}
    </div>
  );
};
