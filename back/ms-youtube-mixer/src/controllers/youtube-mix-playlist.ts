import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

import {
  getPlayList,
  mixPlayList,
} from '../services/youtube-mix-playlist.service';
import {
  createFoldersInCaseNotExistsOnPath,
  removeFileProcessed,
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
  if (!userId || !operationId) {
    res.status(500).send({
      error: 'userId and operationId are required in the headers',
    });
  }

  const io = req.app.get('io');
  const sockets = req.app.get('sockets');
  if (!io || !sockets) {
    res.status(500).send({
      error: 'Socket was not stablished',
    });
  }

  const socketId = sockets[userId];
  const socketInstance = io.to(socketId);
  if (!socketId || !socketInstance) {
    res.status(500).send({
      error: 'socketId and socketInstance were not stablished',
    });
  }

  const body = req.body;
  if (!body) {
    res.status(500).send({
      error: 'Body is empty',
    });
  }

  const videoIds = body.videoIds;
  const extension = body.extension;
  if (!videoIds || !extension) {
    res.status(500).send({
      error: 'VideoIds and Extension are required',
    });
  }

  const ytdlUserBasePath = path.join('files', `ytdl_${userId}_${operationId}`);
  const downloadedUserPath = path.join(
    'files',
    `downloaded_${userId}_${operationId}.${extension}`
  );

  createFoldersInCaseNotExistsOnPath(ytdlUserBasePath);

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
      removeFileProcessed(downloadedUserPath);
    });
  } catch (error) {
    console.log('error:', error);
    removeFolderProcessed(ytdlUserBasePath);
    removeFileProcessed(downloadedUserPath);
    res.status(500).send({
      error: (error as Error).message,
    });
  }
};
