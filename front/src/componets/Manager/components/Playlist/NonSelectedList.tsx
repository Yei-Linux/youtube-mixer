import { Checkbox } from '@/componets/ui/Checkbox';
import { useYtVideoStore } from '@/store';
import classNames from 'classnames';
import { IPLayListVideo } from './List';
import { FC } from 'react';

export interface INonSelectedList {
  selectedVideos: IPLayListVideo[];
}
export const NonSelectedList: FC<INonSelectedList> = ({ selectedVideos }) => {
  const playListVideos = useYtVideoStore((store) => store.playlistSearched);

  return (
    <div className="max-h-[500px] overflow-auto flex flex-col gap-3">
      {playListVideos?.map(
        ({ title, thumbnailOverlays, thumbnail, videoId, videoUrl }) => (
          <label
            key={videoId}
            className={classNames('w-full', 'cursor-pointer', 'max-w-[350px]')}
          >
            <Checkbox
              id={`${videoId}__checkbox__nonselected`}
              name={`${videoId}__checkbox__nonselected`}
              className={classNames('hidden')}
            />
            <span
              className={classNames(
                'cursor-pointer',
                'bg-white p-4 rounded-xl cursor-pointer border-2 peer-checked:border-primary',
                'w-full',
                'text-sm font-medium text-gray-900',
                'inline-block oneline-ellipsis'
              )}
            >
              {title}
            </span>
          </label>
        )
      )}
    </div>
  );
};
