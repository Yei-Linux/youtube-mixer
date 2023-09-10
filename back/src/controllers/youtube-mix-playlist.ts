import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

import {
  getPlayList,
  mixPlayList,
} from '../services/youtube-mix-playlist.service';
import {
  createFoldersInCaseNotExistsOnPath,
  removeFilesProcessed,
  removeFolderProcessed,
} from '../helpers/data';
import { v4 as uuid } from 'uuid';

export const getYTMixPlaylist = async (req: Request, res: Response) => {
  const searchParams = req.query;
  const listId = searchParams?.listId as string;
  const baseVideoId = searchParams?.baseVideoId as string;

  try {
    const playlistUI = await getPlayList(baseVideoId, listId);
    const operationIdAssigned = uuid();

    res.status(200).send({
      playlistUI,
      operationId: operationIdAssigned,
    });
  } catch (error) {
    console.log('error:', error);
    res.status(500).send({
      error: (error as Error).message,
    });
  }
};

export const mixYTPlaylist = async (req: Request, res: Response) => {
  const userId = req.headers?.userid as string;
  const operationId = req.headers?.operationid as string;

  const io = req.app.get('io');
  const sockets = req.app.get('sockets');
  const socketId = sockets[userId];
  const socketInstance = io.to(socketId);

  const body = req.body;
  const videoIds = body.videoIds;
  const extension = body.extension;

  const ytdlUserBasePath = path.join('files', `ytdl_${userId}_${operationId}`);
  const downloadedUserPath = path.join(
    'files',
    `downloaded_${userId}_${operationId}.${extension}`
  );

  createFoldersInCaseNotExistsOnPath(ytdlUserBasePath);
  createFoldersInCaseNotExistsOnPath(downloadedUserPath);

  try {
    await mixPlayList(
      videoIds,
      ytdlUserBasePath,
      downloadedUserPath,
      extension,
      socketInstance,
      operationId
    );

    const file = fs.createReadStream(downloadedUserPath);
    file.pipe(res);
    file.on('close', () => {
      removeFolderProcessed(ytdlUserBasePath);
      removeFolderProcessed(downloadedUserPath);
    });
  } catch (error) {
    console.log('error:', error);
    removeFolderProcessed(ytdlUserBasePath);
    removeFolderProcessed(downloadedUserPath);
    res.status(500).send({
      error: (error as Error).message,
    });
  }
};
