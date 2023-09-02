import { expect, describe, it } from '@jest/globals';
import { getPlayList } from '../../src/services/youtube-mix-playlist.service';

describe('youtube-mix-playlist service', () => {
  it('Get playlist from a listId', async () => {
    const baseVideoId = 'nlXqp3FVrq8';
    const listId = 'RDnlXqp3FVrq8';
    const playlist = await getPlayList(baseVideoId, listId);

    expect(playlist).toBeDefined();
    expect(playlist.length).toBeGreaterThan(0);

    playlist.map(
      ({ title, videoId, videoUrl, thumbnail, thumbnailOverlays }) => {
        expect(title).toBeDefined();
        expect(videoId).toBeDefined();
        expect(videoUrl).toBeDefined();
        expect(thumbnail).toBeDefined();
        expect(thumbnailOverlays).toBeDefined();
      }
    );
  });
});
