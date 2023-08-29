import 'mocha';
import { parseYTSourceText } from '../../src/helpers/parse';

const mock_case1 = `My text: var data ={ "screen": 123 ,"playlist":{"title": "My mix", "content": [{"title": "Video1"},{"title": "Video2"}]}}`;

describe('Parsing youtube content', () => {
  it('When is got a large string from youtube', () => {
    parseYTSourceText(mock_case1);
  });
});
