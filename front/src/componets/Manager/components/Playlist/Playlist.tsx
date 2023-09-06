import { usePlaylist } from '@/hooks';
import { List } from './List';

export const Playlist = () => {
  const { handleMixPlaylist } = usePlaylist();

  return (
    <div className="flex flex-col gap-7">
      <List />
    </div>
  );
};
