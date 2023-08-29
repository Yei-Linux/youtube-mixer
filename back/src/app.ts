import express, { Application } from 'express';
import http from 'http';
import cors from 'cors';
import { ytDownloader } from './controllers/youtube-downloader';
import bodyParser from 'body-parser';
import { ytSearch } from './controllers/youtube-search';
import { getYTMixPlaylist } from './controllers/youtube-mix-playlist';

const app: Application = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
app.use(bodyParser.json());

const PORT = 3001;
const sockets: any = {};

app.post('/api/youtube-download', ytDownloader);
app.get('/api/youtube-search', ytSearch);
app.get('/api/youtube-mix-playlist', getYTMixPlaylist);

io.on('connection', (socket: any) => {
  console.log('Client Connected: ', socket?.id);
  socket.on('connectInit', (sessionId: string) => {
    console.log('New User Connected: ', sessionId);
    sockets[sessionId] = socket.id;
    app.set('sockets', sockets);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected ');
  });
});

app.set('io', io);

server.listen(PORT, () => {
  console.log('Application running up on ', PORT);
});
