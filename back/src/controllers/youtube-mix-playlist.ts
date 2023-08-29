import { Request, Response } from 'express';
import { getYtMixList, getYtPlaylist } from '../helpers/ytdl';

export const getYTMixPlaylist = async (req: Request, res: Response) => {
  const searchParams = req.query;
  const listId = searchParams?.listId as string;
  const baseVideoId = searchParams?.baseVideoId as string;

  try {
    if (!listId) throw new Error('ListId was not passed.');
    if (!baseVideoId) throw new Error('BaseVideoId was not passed.');

    const playList = await getYtMixList(baseVideoId, listId);

    res.status(200).send({
      playListVideos: [],
    });
  } catch (error) {
    console.log('error:', error);
    res.status(500).send({
      error: (error as Error).message,
    });
  }
};
