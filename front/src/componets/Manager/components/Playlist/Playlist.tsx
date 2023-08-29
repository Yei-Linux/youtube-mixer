import { Button } from '@/componets/ui/Button';
import { FormField } from '@/componets/ui/FormField';
import { Input } from '@/componets/ui/Input';
import { usePlaylist } from '@/hooks';

export const Playlist = () => {
  const { handleMixPlaylist } = usePlaylist();

  return (
    <div className="flex flex-col gap-7">
      <form onSubmit={(e) => handleMixPlaylist(e)}>
        <FormField
          htmlFor="search_pl_input"
          labelText={<span className="text-md">Playlist Mixer</span>}
        >
          <div className="flex gap-5">
            <Input
              name="search_pl_input"
              id="search_pl_input"
              placeholder="Search your playlist video..."
            />
          </div>
        </FormField>
        <Button type="submit">Mix</Button>
      </form>
    </div>
  );
};
