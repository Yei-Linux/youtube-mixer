import { expect, describe, it } from '@jest/globals';
import { parseYTSourceText } from '../../src/helpers/parse';
import {
  mock_parse_yt_source_basic_case,
  mock_parse_yt_source_basic_case_2,
  mock_parse_yt_strange_characters,
  mock_parse_yt_strange_characters_case_2,
  mock_parse_yt_real_playlist_html,
  mock_parse_yt_real_playlist_html_2,
  mock_parse_yt_one_part,
} from '../../src/mocks/parse-yt-source.mock';
import { mock_parse_yt_real_playlist_html_3 } from '../../src/mocks/yt-scrapte-source.mock';

const splitterOne = [
  '{"playlist":',
  ' {"playlist" : ',
  '{"playlist": ',
  ' {"playlist":',
];

describe('Parsing youtube content', () => {
  it('When is got a large string from case_one', () => {
    const parsed = parseYTSourceText(
      mock_parse_yt_source_basic_case,
      splitterOne
    );
    expect(parsed).toBeDefined();
  });
  it('When is got a large string from case_two', () => {
    const parsed = parseYTSourceText(
      mock_parse_yt_source_basic_case_2,
      splitterOne
    );
    expect(parsed).toBeDefined();
  });
  it('When is got a large string from strange characters case', () => {
    const parsed = parseYTSourceText(
      mock_parse_yt_strange_characters,
      splitterOne
    );
  });

  it('When is got a large string from strange characters case 2', () => {
    const parsed = parseYTSourceText(
      mock_parse_yt_strange_characters_case_2,
      splitterOne
    );
    expect(parsed).toBeDefined();
  });

  it('When is got a large string from youtube one part', () => {
    const parsed = parseYTSourceText(mock_parse_yt_one_part, splitterOne);
    expect(parsed).toBeDefined();
  });

  it('When is got a large string from youtube', () => {
    const parsed = parseYTSourceText(
      mock_parse_yt_real_playlist_html,
      splitterOne
    );
    expect(parsed).toBeDefined();
  });

  it('When is got a large string from youtube case two', () => {
    const parsed = parseYTSourceText(
      mock_parse_yt_real_playlist_html_2,
      splitterOne
    );
    expect(parsed).toBeDefined();
  });

  it('When is got a large string from youtube case three', () => {
    const parsed = parseYTSourceText(
      mock_parse_yt_real_playlist_html_3,
      splitterOne
    );
    expect(parsed).toBeDefined();
  });
});
