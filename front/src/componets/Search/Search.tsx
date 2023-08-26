'use client';

import { Button } from '../ui/Button';
import { FormField } from '../ui/FormField';
import { Input } from '../ui/Input';
import { useInput, useYoutubeSearch } from '../../hooks';

import { YoutubeCover } from './components/YoutubeCover/YoutubeCover';

export const Search = () => {
  const { value, handleType } = useInput();
  const { metaInfo, handleSearch } = useYoutubeSearch();

  return (
    <div className="max-w-md mx-auto p-5 flex flex-col gap-5 justify-center">
      <FormField
        htmlFor="search_input"
        labelText={<span className="text-md">Youtube Search</span>}
      >
        <div className="flex gap-5">
          <Input
            value={value}
            onChange={handleType}
            id="search_input"
            placeholder="Search your video..."
          />
          <Button onClick={(e) => handleSearch(value)}>Search</Button>
        </div>
      </FormField>

      <div>
        <YoutubeCover {...metaInfo} />
      </div>
    </div>
  );
};
