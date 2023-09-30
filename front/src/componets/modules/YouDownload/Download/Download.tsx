import { Select } from '../../../ui/Select';
import { useState } from 'react';
import { DownloadTable } from './Table/Table';
import { TExtension, TFormatsGrouped } from '../../../../types/conversion';

export const Download = () => {
  const [extension, setExtension] = useState<TFormatsGrouped>('mp4');

  return (
    <div className="flex flex-col gap-7">
      <div>
        <Select
          label="Types"
          value={extension}
          onChange={(e) => setExtension(e.target.value as TExtension)}
        >
          <Select.Option key="mp4" value="mp4">
            MP4
          </Select.Option>
          <Select.Option key="mp3" value="mp3">
            MP3
          </Select.Option>
          <Select.Option key="mp4WithoutAudio" value="mp4WithoutAudio">
            MP4 Without Audio
          </Select.Option>
        </Select>
      </div>

      <DownloadTable extension={extension} />
    </div>
  );
};
