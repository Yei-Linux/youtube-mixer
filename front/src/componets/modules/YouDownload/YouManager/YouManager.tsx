'use client';

import { Empty } from '@/componets/modules/shared/Empty/Empty';
import { Tabs } from '@/componets/ui/Tabs';
import { useYtVideoStore } from '@/store';

import { Download } from '../Download';

export const YouManager = () => {
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
          ]}
        />
      )}
    </div>
  );
};
