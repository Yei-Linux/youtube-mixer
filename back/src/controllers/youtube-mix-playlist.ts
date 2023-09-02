import { Request, Response } from 'express';
import { getPlayList } from '../services/youtube-mix-playlist.service';

export const getYTMixPlaylist = async (req: Request, res: Response) => {
  const searchParams = req.query;
  const listId = searchParams?.listId as string;
  const baseVideoId = searchParams?.baseVideoId as string;

  try {
    const playlistUI = await getPlayList(baseVideoId, listId);

    res.status(200).send({
      playlistUI,
    });
  } catch (error) {
    console.log('error:', error);
    res.status(500).send({
      error: (error as Error).message,
    });
  }
};
