'use client';

import { Button } from '../ui/Button';
import { FormField } from '../ui/FormField';
import { Input } from '../ui/Input';
import { useYoutubeSearch } from '../../hooks';

import { YoutubeCover } from './components/YoutubeCover/YoutubeCover';

export const Search = () => {
  const { metaInfo, handleSearch } = useYoutubeSearch();

  return (
    <div className="max-w-md mx-auto p-5 flex flex-col gap-5 justify-center">
      <form onSubmit={(e) => handleSearch(e)}>
        <FormField
          htmlFor="search_input"
          labelText={<span className="text-md">Youtube Search</span>}
        >
          <div className="flex gap-5">
            <Input
              name="search_input"
              id="search_input"
              placeholder="Search your video..."
            />
            <Button type="submit">Search</Button>
          </div>
        </FormField>
      </form>

      <div>
        <YoutubeCover {...metaInfo} />
      </div>
    </div>
  );
};
