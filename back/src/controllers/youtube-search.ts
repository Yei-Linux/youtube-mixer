import { Request, Response } from 'express';
import { getYtInfo } from '../helpers/ytdl';
import {
  getTimeFormatBySeconds,
  groupFormatsByExtension,
} from '../helpers/data';

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
    const srcBiggest = !thumbnails?.length
      ? ''
      : thumbnailsSortedBySize?.at(0)?.url;
    const videoDuration = getTimeFormatBySeconds(Number(lengthSeconds));
    const formatsGrouped = groupFormatsByExtension(formatsYt);

    const response = {
      src: srcBiggest,
      alt: videoTitle,
      videoTitle,
      videoDuration,
      url: ybVideoUrl,
      formatsGrouped,
      formatsYt,
    };
    res.status(200).send(response);
  } catch (error) {
    console.log('search endpoint error:', (error as Error).message);
    res.status(500).send({
      error,
    });
  }
};
