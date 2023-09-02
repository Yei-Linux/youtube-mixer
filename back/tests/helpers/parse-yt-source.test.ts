import 'mocha';
import { parseYTSourceText } from '../../src/helpers/parse';
import {
  mock_parse_yt_source_basic_case,
  mock_parse_yt_source_basic_case_2,
  mock_parse_yt_strange_characters,
  mock_parse_yt_real_playlist_html,
  mock_parse_yt_one_part,
} from '../../src/mocks/parse-yt-source.mock';

const splitterOne = [
  'var ytInitialData=',
  'var ytInitialData =',
  'window["ytInitialData"]=',
  'window["ytInitialData"] =',
];

describe('Parsing youtube content', () => {
  it('When is got a large string from case_one', () => {
    const parsed = parseYTSourceText(
      mock_parse_yt_source_basic_case,
      splitterOne
    );
  });
  it('When is got a large string from case_two', () => {
    const parsed = parseYTSourceText(
      mock_parse_yt_source_basic_case_2,
      splitterOne
    );
  });
  it('When is got a large string from strange characters case', () => {
    const parsed = parseYTSourceText(
      mock_parse_yt_strange_characters,
      splitterOne
    );
  });
  it('When is got a large string from youtube one part', () => {
    const parsed = parseYTSourceText(mock_parse_yt_one_part, splitterOne);
  });

  it('When is got a large string from youtube', () => {
    const parsed = parseYTSourceText(
      mock_parse_yt_real_playlist_html,
      splitterOne
    );

    const playList =
      parsed.contents.twoColumnWatchNextResults.playlist.playlist;

    console.log('test', playList);
  });
});
