import 'mocha';
import { parseYTSourceText } from '../../src/helpers/parse';
import { mock_parse_yt_source_case1 } from '../../src/mocks/parse-yt-source.mock';

describe('Parsing youtube content', () => {
  it('When is got a large string from youtube', () => {
    const parsed = parseYTSourceText(mock_parse_yt_source_case1, [
      'var ytInitialData=',
      'var ytInitialData =',
      'window["ytInitialData"]=',
      'window["ytInitialData"] =',
    ]);

    console.log('test', parsed);
  });
});
