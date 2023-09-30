import { TRANSCRIPTION_CONTAINER } from '../constants';
import { ITextHighlight } from '../helpers';

export const getTooltipPositions = (textHighlight: ITextHighlight | null) => {
  const positionEnd = textHighlight?.positionEnd;
  if (!positionEnd) return;

  const id = `#token_${positionEnd}`;
  const HTMLElement = document.querySelector(id);
  if (!HTMLElement) return;

  const transcriptionContainerElement = document.querySelector(
    TRANSCRIPTION_CONTAINER
  );
  if (!transcriptionContainerElement) return;

  const widthSelectionOptions = 120;

  const scroll = transcriptionContainerElement.scrollTop;
  const scrollWidth = transcriptionContainerElement.clientWidth;
  const { left, top } = HTMLElement.getBoundingClientRect();

  const diffWithSelectionWidth = scrollWidth - widthSelectionOptions;
  const leftComputed = Math.min(left, diffWithSelectionWidth);

  return { left: leftComputed, top: top - 110 + scroll };
};
