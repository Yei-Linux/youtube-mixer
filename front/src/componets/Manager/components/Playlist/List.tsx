import { FC } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { NonSelectedList } from './NonSelectedList';
import { SelectedList } from './SelectedList';
import { Button } from '@/componets/ui/Button';
import { useTransferSelection } from './useTransferSelection';
import { usePlaylist } from '@/hooks';

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
  const { decideWichOne, nonSelectedVideos, selectedVideos } =
    useTransferSelection();

  const { handleMixPlaylist } = usePlaylist();

  return (
    <div className="flex flex-col gap-7">
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

      <Button onClick={() => handleMixPlaylist(selectedVideos)}>
        Mix selected videos
      </Button>
    </div>
  );
};
