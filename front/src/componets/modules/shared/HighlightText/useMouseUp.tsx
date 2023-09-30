/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import {
  ITooltipPosition,
  THandleCloseTooltipOnHighlight,
} from './TooltipOptions/useTooltipOptions';
import { ITextHighlight } from './helpers';

export interface IUseMouseUp {
  currentTextHighlight: ITextHighlight | null;
  updateIsTextHightlight: (value: boolean) => void;
  updateTextHightlight: (value: ITextHighlight | null) => void;

  tooltipPositions: ITooltipPosition | null;
  handleCloseTooltip: THandleCloseTooltipOnHighlight;
  closeTooltip: () => void;
  openTooltipByTextSelectedOnHighlight: (
    textSelectedOnHighlight: ITextHighlight
  ) => void;
}
export const useMouseUp = ({
  currentTextHighlight,
  updateIsTextHightlight,
  updateTextHightlight,
  tooltipPositions,
  closeTooltip,
  handleCloseTooltip,
  openTooltipByTextSelectedOnHighlight,
}: IUseMouseUp) => {
  const handleMouseup = (e: MouseEvent) => {
    if (!!tooltipPositions) {
      const isClosed = handleCloseTooltip(e);

      isClosed && updateTextHightlight(null);
      return;
    }

    if (currentTextHighlight) {
      openTooltipByTextSelectedOnHighlight(currentTextHighlight);
      updateIsTextHightlight(false);
      return;
    }
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseup);

    return () => window.removeEventListener('mouseup', handleMouseup);
  }, [tooltipPositions, currentTextHighlight]);

  return {};
};
