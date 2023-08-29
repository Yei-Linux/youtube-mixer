'use client';

import { Tabs } from '../ui/Tabs';
import { Download } from './components/Download/Download';
import { useYtVideoStore } from '../../store';
import { Empty } from './components/Empty/Empty';
import { Playlist } from './components/Playlist/Playlist';

export const Manager = () => {
  const metaInfo = useYtVideoStore((state) => state.metaInfo);

  return (
    <div className="w-fit mx-auto flex flex-col gap-5 mt-10">
      {!metaInfo.url ? (
        <Empty />
      ) : (
        <Tabs
          tabs={[
            {
              headerContent: <h3 className="text-md">Download Now</h3>,
              bodyContent: <Download />,
            },
            {
              headerContent: <h3 className="text-md">Mix Playlist</h3>,
              bodyContent: <Playlist />,
            },
            {
              headerContent: <h3 className="text-md">Create Summary</h3>,
              bodyContent: <Download />,
            },
            {
              headerContent: <h3 className="text-md">Create Reel</h3>,
              bodyContent: <Download />,
            },
          ]}
        />
      )}
    </div>
  );
};
