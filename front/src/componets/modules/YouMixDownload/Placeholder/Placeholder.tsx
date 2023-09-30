import { placeholderMultipleVideo, useYtVideoStore } from '@/store';
import { Pagination } from '@nextui-org/pagination';
import classNames from 'classnames';
import { useMemo, useState } from 'react';
import { YoutubeCover } from '../../shared';

export const Placeholder = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const TOTAL_ITEMS_BY_PAGE = 8;
  const playListVideos = useYtVideoStore((store) => store.playlistSearched);
  const playList = !playListVideos.length
    ? placeholderMultipleVideo
    : playListVideos;
  const pages = Math.round(playList.length / TOTAL_ITEMS_BY_PAGE);

  const currentItemsFromPage = useMemo(() => {
    const start = (currentPage - 1) * TOTAL_ITEMS_BY_PAGE;
    const end = start + TOTAL_ITEMS_BY_PAGE;
    return playList.slice(start, end);
  }, [currentPage, playList]);

  return (
    <div className="flex flex-col gap-7 items-center">
      <div className="flex flex-wrap gap-7 max-h-[700px] max-w-[900px] overflow-auto">
        {currentItemsFromPage?.map(
          ({ title, thumbnailOverlays, thumbnail, videoId, videoUrl }) => (
            <div
              key={videoId}
              className={classNames({
                'max-w-[200px]': playList.length > 1,
              })}
            >
              <YoutubeCover
                src={thumbnail.url}
                videoTitle={title}
                videoDuration={thumbnailOverlays}
                titleClassname={classNames({
                  'text-xs': playList.length > 1,
                  'text-left': playList.length > 1,
                })}
                durationClassname={classNames({
                  'text-xs': playList.length > 1,
                  'text-left': playList.length > 1,
                })}
                alt={title}
              />
            </div>
          )
        )}
      </div>

      {pages > 1 && (
        <div className="w-full flex justify-center mb-7">
          <Pagination
            total={pages}
            variant="light"
            color="primary"
            page={currentPage}
            onChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};
