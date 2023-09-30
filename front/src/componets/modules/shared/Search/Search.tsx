'use client';

import { Button } from '../../../ui/Button';
import { FormField } from '../../../ui/FormField';
import { Input } from '../../../ui/Input';
import { useYoutubeSearch } from '../../../../hooks';

import { FC, useMemo } from 'react';

export interface ISearch {
  isMultiple: boolean;
}
export const Search: FC<ISearch> = ({ isMultiple }) => {
  const { handleSearch } = useYoutubeSearch();
  const youtubeSearchTitle = useMemo(() => {
    if (isMultiple) return 'Youtube Playlist Search';

    return 'Youtube Single Video Search';
  }, [isMultiple]);

  return (
    <div className="max-w-md mx-auto p-5 flex flex-col gap-5 justify-center">
      <form onSubmit={(e) => handleSearch(e, isMultiple)}>
        <FormField
          htmlFor="search_input"
          labelClassName="mb-2"
          labelText={<span className="text-md">{youtubeSearchTitle}</span>}
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
    </div>
  );
};
