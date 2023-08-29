import { Request, Response } from 'express';
import path from 'path';
import { TGetStream } from '../types/conversion';
import { extensionEquivalents, removeFilesProcessed } from '../helpers/data';
import { getYtPlaylist, getYtbStream } from '../helpers/ytdl';
import { streamToExtension } from '../helpers/streams';
import fs from 'fs';

export const ytMixPlaylist = async (req: Request, res: Response) => {
  const userId = req.headers?.userid as string;
  const operationId = req.headers?.operationid as string;
  const searchParams = req.query;
  const ytPlaylistId = searchParams?.ytPlaylistId as string;
  const extension = 'mp3';

  const io = req.app.get('io');
  const sockets = req.app.get('sockets');
  const socketId = sockets[userId];
  const socketInstance = io.to(socketId);

  const validExtension =
    extensionEquivalents[extension as TGetStream['extension']];
  const ytdlUserPath = path.join(
    'files',
    `ytdl_${userId}_${operationId}.${validExtension}`
  );
  const downloadedUserPath = path.join(
    'files',
    `downloaded_${userId}_${operationId}.${validExtension}`
  );

  try {
    if (!socketInstance) throw new Error('Socket Instance was not passed.');

    if (!userId) throw new Error('UserId Header was not passed.');
    if (!operationId) throw new Error('OperationId Header was not passed.');

    if (!ytPlaylistId) throw new Error('Youtube Video Url was not passed.');
    if (!extension) throw new Error('extension was not passed.');
    if (!['mp3', 'mp4', 'mp4WithoutAudio'].includes(extension))
      throw new Error('Invalid Extension.');

    const playList = await getYtPlaylist(ytPlaylistId);
    const videoUrls = playList.items.map(({ url }) => url);
  } catch (error) {
    console.log('error:', error);

    removeFilesProcessed(ytdlUserPath, downloadedUserPath);
    res.status(500).send({
      error: (error as Error).message,
    });
  }
};
