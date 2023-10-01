import { useState } from 'react';
import { ITextHighlight } from '../../shared/HighlightText/helpers';

export type TIndexWordsRemoved = Array<ITextHighlight>;
export type TUpdateIndexWordsRemoved = (value: TIndexWordsRemoved) => void;
export const useIndexWordsRemoved = () => {
  const [indexWordsRemoved, setIndexWordsRemoved] =
    useState<TIndexWordsRemoved>([]);

  const updateIndexWordsRemoved: TUpdateIndexWordsRemoved = (
    value: TIndexWordsRemoved
  ) => setIndexWordsRemoved(value);

  return { indexWordsRemoved, updateIndexWordsRemoved };
};
