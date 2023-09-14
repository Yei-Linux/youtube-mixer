import { Request, Response } from 'express';
import path from 'path';
import { TGetStream } from '../types/conversion';
import { extensionEquivalents, removeFilesProcessed } from '../helpers/data';
import { getYtbStream } from '../helpers/ytdl';
import { streamToExtension } from '../helpers/streams';
import fs from 'fs';
import { UPLOAD_PROGRESS_STEPONE_SINGLE } from '../constants/socket';

export const ytDownloader = async (req: Request, res: Response) => {
  const userId = req.headers?.userid as string;
  const operationId = req.headers?.operationid as string;
  const searchParams = req.query;
  const ytUrl = searchParams?.ytUrl as string;
  const extension = searchParams?.extension as string;
  const itag = searchParams?.itag as string;

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

    if (!ytUrl) throw new Error('Youtube Video Url was not passed.');
    if (!extension) throw new Error('extension was not passed.');
    if (!['mp3', 'mp4', 'mp4WithoutAudio'].includes(extension))
      throw new Error('Invalid Extension.');
    if (!itag) {
      throw new Error('Invalid itag.');
    }

    await getYtbStream({
      ytUrl,
      ytdlUserPath,
      extension: extension as TGetStream['extension'],
      itag: +itag,
      socket: socketInstance,
      operationId,
      eventName: UPLOAD_PROGRESS_STEPONE_SINGLE,
    });
    await streamToExtension(
      validExtension,
      downloadedUserPath,
      ytdlUserPath,
      socketInstance,
      operationId
    );

    const file = fs.createReadStream(downloadedUserPath);
    file.pipe(res);
    file.on('close', () => {
      removeFilesProcessed(ytdlUserPath, downloadedUserPath);
    });
  } catch (error) {
    console.log('error:', error);

    removeFilesProcessed(ytdlUserPath, downloadedUserPath);
    res.status(500).send({
      error: (error as Error).message,
    });
  }
};
