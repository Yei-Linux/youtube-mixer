import { useYtVideoStore } from '@/store';
import { YoutubeCover } from '../../shared';

export const Placeholder = () => {
  const metaInfo = useYtVideoStore((store) => store.metaInfo);

  return (
    <div>
      <div className="max-w-fit m-auto">
        <YoutubeCover {...metaInfo} />
      </div>
    </div>
  );
};
