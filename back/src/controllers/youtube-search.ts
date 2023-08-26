import { Request, Response } from 'express';
import { getYtInfo } from '../helpers/ytdl';
import { getTimeFormatBySeconds, transformToNiceFormat } from '../helpers/data';
import { INiceFormat } from '../types/conversion';

export const ytSearch = async (req: Request, res: Response) => {
  const searchParams = req.query;
  const ybVideoUrl = searchParams?.url as string;

  try {
    if (!ybVideoUrl) throw new Error('Youtube Video Url was not passed.');

    const ytVideoInfo = await getYtInfo(ybVideoUrl);

    const { videoDetails, formats: formatsYt } = ytVideoInfo;
    const { title: videoTitle, lengthSeconds, thumbnails } = videoDetails;
    const thumbnailsSortedBySize = thumbnails
      .slice()
      .sort((a, b) => b.width - a.width);

    const src = !thumbnails?.length ? '' : thumbnailsSortedBySize?.at(0)?.url;
    const videoDuration = getTimeFormatBySeconds(Number(lengthSeconds));
    const formatsGrouped = formatsYt
      ?.filter((format) => format.qualityLabel || format.audioQuality)
      .reduce((acc, format) => {
        const conditions = [
          {
            label: 'mp3',
            condition: format.hasAudio && !format.hasVideo,
          },
          {
            label: 'mp4',
            condition: format.hasAudio && format.hasVideo,
          },
          {
            label: 'mp4WithoutAudio',
            condition: !format.hasAudio && format.hasVideo,
          },
        ];

        const formatApplied = conditions.find(({ condition }) => !!condition);
        if (!formatApplied) throw new Error('Any format matched');

        const { label } = formatApplied;
        const formatTransformed = transformToNiceFormat(format);

        const preset = acc[label] ?? [];
        return {
          ...acc,
          [label]: [...preset, formatTransformed],
        };
      }, {} as Record<string, Array<INiceFormat>>);

    const response = {
      src,
      alt: videoTitle,
      videoTitle,
      videoDuration,
      url: ybVideoUrl,
      formatsGrouped,
    };
    res.status(200).send(response);
  } catch (error) {
    console.log('search endpoint error:', (error as Error).message);
    res.status(500).send({
      error,
    });
  }
};
