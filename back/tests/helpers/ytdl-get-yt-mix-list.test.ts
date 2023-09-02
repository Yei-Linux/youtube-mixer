import { expect, describe, it } from '@jest/globals';
import { getYtMixList } from '../../src/helpers/ytdl';

describe('ytdl-get-yt-mix-list', () => {
  it('Get playlist from a listId', async () => {
    const baseVideoId = 'Y7a_s5OCD5A';
    const listId = 'RDY7a_s5OCD5A';
    const playlist = await getYtMixList(baseVideoId, listId);

    expect(playlist).toBeDefined();
    expect(playlist.length).toBeGreaterThan(0);
  });
});
