import { Select } from '../../../ui/Select';
import { useState } from 'react';
import { DownloadTable } from './DownloadTable';
import { TExtension, TFormatsGrouped } from '../../../../types/conversion';

export const Download = () => {
  const [extension, setExtension] = useState<TFormatsGrouped>('mp4');

  return (
    <div className="flex flex-col gap-7">
      <div>
        <label htmlFor="extensions" className="block mb-2 text-sm font-medium">
          Extension:
        </label>
        <Select
          value={extension}
          onChange={(e) => setExtension(e.target.value as TExtension)}
        >
          <Select.Option value="mp4">MP4</Select.Option>
          <Select.Option value="mp3">MP3</Select.Option>
          <Select.Option value="mp4WithoutAudio">
            MP4 Without Audio
          </Select.Option>
        </Select>
      </div>

      <DownloadTable extension={extension} />
    </div>
  );
};
