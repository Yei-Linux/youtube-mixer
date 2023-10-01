import { Fragment } from 'react';
import {
  THandlerMouseDownOnHighlight,
  THandlerMouseOverOnHighlight,
  useCurrentHighlight,
} from './useCurrentHighlight';
import {
  ITextHighlight,
  TIsOnRange,
  TIsOnSomeRange,
  isOnRange,
  isSomeOnRange,
} from './helpers';
import { Word } from './Word';
import {
  THandleCloseTooltip,
  THandleOpenTooltipOnHighlight,
  useTooltipOptions,
} from './TooltipOptions/useTooltipOptions';
import { ToopltipOptions } from './TooltipOptions';
import { useMouseUp } from './useMouseUp';

type TWord = string;
export interface ISentence {
  words: Array<TWord>;
}

export interface IRenderTooltip {
  currentTextHighlight: ITextHighlight | null;
  closeTooltip: () => void;
  updateTextHightlight: (value: ITextHighlight | null) => void;
}
interface IChild {
  isOnRange: TIsOnRange;
  isSomeOnRange: TIsOnSomeRange;
  handleContinueHighlight: () => void;
  handleStopHighlight: () => void;
  handleMouseDownOnHighlight: THandlerMouseDownOnHighlight;
  handleMouseOverOnHighlight: THandlerMouseOverOnHighlight;
  word: string;
  index: number;
  currentTextHighlight: ITextHighlight | null;
  handleOpenTooltip: THandleOpenTooltipOnHighlight;
  closeTooltip: THandleCloseTooltip;
}
export interface IHighlighText {
  words: Array<TWord>;
  renderTooltipContent: (prop: IRenderTooltip) => React.ReactNode;
  children: (child: IChild) => React.ReactNode;
}

export const HightlightText = ({
  words,
  renderTooltipContent,
  children,
}: IHighlighText) => {
  const {
    updateTextHightlight,
    updateIsTextHightlight,
    handleStopHighlight,
    handleContinueHighlight,
    handleMouseDownOnHighlight,
    handleMouseOverOnHighlight,
    currentTextHighlight,
  } = useCurrentHighlight();

  const {
    handleCloseTooltip,
    handleOpenTooltip,
    closeTooltip,
    isVisibleTooltip,
    tooltipPositions,
    openTooltipByTextSelectedOnHighlight,
  } = useTooltipOptions({
    id: 'tooltip_options',
  });

  useMouseUp({
    updateIsTextHightlight,
    updateTextHightlight,
    tooltipPositions,
    openTooltipByTextSelectedOnHighlight,
    currentTextHighlight,
    closeTooltip,
    handleCloseTooltip,
  });

  return (
    <Fragment>
      <ToopltipOptions
        id="tooltip_options"
        top={tooltipPositions?.top ?? -1}
        left={tooltipPositions?.left ?? -1}
        isHidden={!isVisibleTooltip}
      >
        {renderTooltipContent({
          currentTextHighlight,
          closeTooltip,
          updateTextHightlight,
        })}
      </ToopltipOptions>

      {words.map((word, index) =>
        children({
          isOnRange,
          isSomeOnRange,
          handleMouseDownOnHighlight,
          handleMouseOverOnHighlight,
          handleContinueHighlight,
          handleStopHighlight,
          word,
          index,
          currentTextHighlight,
          handleOpenTooltip,
          closeTooltip,
        })
      )}
    </Fragment>
  );
};

HightlightText.Word = Word;
