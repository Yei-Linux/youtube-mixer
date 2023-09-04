import { FC, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { NonSelectedList } from './NonSelectedList';
import { SelectedList } from './SelectedList';
import { Button } from '@/componets/ui/Button';

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
  const [selectedVideos, setSelectedVideos] = useState<IPLayListVideo[]>([]);

  const handleAddSelectedVideos = (nonselectedform: HTMLFormElement) => {
    const formVideosNonSelected = Object.fromEntries(
      new FormData(nonselectedform)
    );
    console.log(formVideosNonSelected);

    const checkedVideos: IPLayListVideo[] = [];
    // setSelectedVideos((prev) => [...prev, ...checkedVideos]);
  };

  const handleRemoveSelectedVideos = (selectedform: HTMLFormElement) => {
    const formVideosSelected = Object.fromEntries(new FormData(selectedform));
    console.log(formVideosSelected);

    const checkedVideos: IPLayListVideo[] = [];
    const ids = checkedVideos.map(({ videoId }) => videoId);
    // setSelectedVideos((prev) =>
    //   prev.filter(({ videoId }) => !ids.includes(videoId))
    //  );
  };

  const decideWichOne = (e: any) => {
    e.preventDefault();
    const id = e.nativeEvent.submitter.id;
    if (!['add', 'remove'].includes(id)) return;
    const isForAdding = id === 'add';

    if (isForAdding) return handleAddSelectedVideos(e.target);
    return handleRemoveSelectedVideos(e.target);
  };

  return (
    <form className="flex gap-3" onSubmit={decideWichOne}>
      <NonSelectedList selectedVideos={selectedVideos} />
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
  );
};
