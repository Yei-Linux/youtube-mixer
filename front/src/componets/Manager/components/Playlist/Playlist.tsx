import { usePlaylist } from '@/hooks';
import { List } from './List';

export const Playlist = () => {
  return (
    <div className="flex flex-col gap-7">
      <List />
    </div>
  );
};
