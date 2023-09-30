import { IPLayListVideo } from '@/componets/modules/YouMixDownload/Playlist/List';
import { mixPlayList } from '@/services/playlist-mix';
import { useYtVideoStore } from '@/store';
import { downloadFile } from '@/utils';

export const usePlaylist = () => {
  const userId = useYtVideoStore((store) => store.userId);
  const operationId = useYtVideoStore((store) => store.mixingOperationId);
  const playlistVideosInfo = useYtVideoStore((store) => store.playlistSearched);

  const handleMixPlaylist = async (
    selectedVideos: IPLayListVideo[],
    extension: string
  ) => {
    if (!selectedVideos.length) return;
    if (selectedVideos.length > 5) return;

    const videoIds = selectedVideos.map(({ videoId }) => videoId);

    const blob = await mixPlayList(
      {
        videoIds,
        extension,
      },
      userId,
      operationId
    );
    const newBlob = new Blob([blob]);
    downloadFile(newBlob, extension);
    try {
    } catch (error) {}
  };

  return { playlistVideosInfo, handleMixPlaylist, operationId };
};
