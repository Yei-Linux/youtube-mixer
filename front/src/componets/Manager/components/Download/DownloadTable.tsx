import { audioEquivalents } from '../../../../helpers/data';
import { useYoutubeDownload } from '../../../../hooks';
import { useYtVideoStore } from '../../../../store';
import { INiceFormat, TFormatsGrouped } from '../../../../types/conversion';
import { FC, useMemo } from 'react';
import { ActionButtons } from './ActionButtons';

export interface IDownloadTable {
  extension: TFormatsGrouped;
}
export const DownloadTable: FC<IDownloadTable> = ({ extension }) => {
  const userId = useYtVideoStore((state) => state.userId);
  const { url: ytUrl, formatsGrouped } = useYtVideoStore(
    (state) => state.metaInfo
  );
  const { handleDownload } = useYoutubeDownload();
  const formats = useMemo(() => formatsGrouped?.[extension] ?? [], [extension]);

  const getQualityLabel = (format: INiceFormat) => ({
    mp3: format.audioQuality ? audioEquivalents[format.audioQuality] : '',
    mp4: format.videoQuality,
    mp4WithoutAudio: format.videoQuality,
  });

  return (
    <div className="flex flex-col gap-5">
      <table className="max-w-[700px] table-auto border-separate border-spacing-x-10 border-spacing-y-2">
        <thead>
          <tr className="table w-full table-fixed">
            <th className="font-bold text-lg text-center text-blue-500">
              Quality
            </th>
            <th className="font-bold text-lg text-center text-blue-500">
              Size
            </th>
            <th className="font-bold text-lg text-center text-blue-500">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="block max-h-[220px] overflow-y-scroll">
          {formats.map((format, index) => (
            <tr key={index} className="table w-full table-fixed">
              <td>{getQualityLabel(format)[extension]}</td>
              <td>{[format.size, 'MB'].join(' ')}</td>
              <td>
                <ActionButtons
                  operationId={format.operationId}
                  onDownload={() =>
                    handleDownload(
                      {
                        ytUrl,
                        extension,
                        itag: format.itag,
                      },
                      userId,
                      format.operationId
                    )
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
