import { FC, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { NonSelectedList } from './NonSelectedList';
import { SelectedList } from './SelectedList';
import { Button } from '@/componets/ui/Button';
import { useTransferSelection } from './useTransferSelection';
import { usePlaylist } from '@/hooks';
import { ProgressBarWrapper } from '@/componets/modules/shared/ProgressWrapper/ProgressWrapper';
import { Select } from '@/componets/ui/Select';
import { TExtension } from '@/types/conversion';

export interface IPLayListVideo {
  videoUrl: string;
  thumbnail: {
    url: string;
    width: string;
    height: string;
  };
  title: string;
  videoId: string;
  thumbnailOverlays: string;
}

export interface IList {}

export const List: FC<IList> = ({}) => {
  const [extension, setExtension] = useState('mp3');
  const { decideWichOne, nonSelectedVideos, selectedVideos } =
    useTransferSelection();

  const { handleMixPlaylist, operationId } = usePlaylist();

  return (
    <div className="flex flex-col gap-7">
      <div className="mb-3">
        <Select
          label="Types"
          value={extension}
          onChange={(e) => setExtension(e.target.value as TExtension)}
        >
          <Select.Option key="mp3" value="mp3">
            MP3
          </Select.Option>
        </Select>
      </div>

      <form className="flex flex-wrap gap-3" onSubmit={decideWichOne}>
        <NonSelectedList nonSelectedVideos={nonSelectedVideos} />
        <div className="flex flex-col justify-center items-center gap-3 p-3">
          <Button className="rounded-md" type="submit" id="remove">
            <FaArrowLeft className="text-white" />
          </Button>
          <Button className="rounded-md" type="submit" id="add">
            <FaArrowRight className="text-white" />
          </Button>
        </div>
        <SelectedList selectedVideos={selectedVideos} />
      </form>

      <ProgressBarWrapper operationId={operationId} eventName="MIX">
        <Button onClick={() => handleMixPlaylist(selectedVideos, extension)}>
          Mix selected videos
        </Button>
      </ProgressBarWrapper>
    </div>
  );
};
