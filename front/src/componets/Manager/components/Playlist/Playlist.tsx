import { Button } from '@/componets/ui/Button';
import { FormField } from '@/componets/ui/FormField';
import { Input } from '@/componets/ui/Input';
import { usePlaylist } from '@/hooks';
import { List } from './List';

export const Playlist = () => {
  const { playlistVideosInfo, handleMixPlaylist } = usePlaylist();

  return (
    <div className="flex flex-col gap-7">
      <form onSubmit={(e) => handleMixPlaylist(e)}>
        <List playListVideos={playlistVideosInfo} />
        <Button type="submit">Mix</Button>
      </form>
    </div>
  );
};
