export interface ITextHighlight {
  positionStart: number;
  positionEnd: number;
}
export type TIsOnRange = (
  positionStart: number,
  positionEnd: number,
  index: number
) => boolean;
export const isOnRange: TIsOnRange = (positionStart, positionEnd, index) => {
  return positionStart <= index && positionEnd >= index;
};

export type TIsOnSomeRange = (
  words: ITextHighlight[],
  index: number
) => boolean;
export const isSomeOnRange: TIsOnSomeRange = (words, index) => {
  return words.some(({ positionStart, positionEnd }) =>
    isOnRange(positionStart, positionEnd, index)
  );
};
