'use client';

import { Tabs } from '../../../ui/Tabs';
import { useYtVideoStore } from '../../../../store';
import { Empty } from '../../shared/Empty/Empty';
import { Playlist } from '../Playlist/Playlist';

export const YouMixManager = () => {
  const playlistSearched = useYtVideoStore((state) => state.playlistSearched);

  return (
    <div className="w-fit mx-auto flex flex-col gap-5 mt-10">
      {!playlistSearched.length ? (
        <Empty />
      ) : (
        <Tabs
          tabs={[
            {
              headerContent: <h3 className="text-md">Mix Playlist</h3>,
              bodyContent: <Playlist />,
            },
          ]}
        />
      )}
    </div>
  );
};
