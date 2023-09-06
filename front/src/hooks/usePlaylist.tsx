import { IPLayListVideo } from '@/componets/Manager/components/Playlist/List';
import { mixPlayList } from '@/services/playlist-mix';
import { useYtVideoStore } from '@/store';
import { downloadFile } from '@/utils';

export const usePlaylist = () => {
  const userId = useYtVideoStore((store) => store.userId);
  const operationId = useYtVideoStore((store) => store.mixingOperationId);
  const playlistVideosInfo = useYtVideoStore((store) => store.playlistSearched);

  const handleMixPlaylist = async (selectedVideos: IPLayListVideo[]) => {
    if (!selectedVideos.length) return;

    const extension = 'mp3';
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

  return { playlistVideosInfo, handleMixPlaylist };
};
