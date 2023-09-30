import { useMemo, useState } from 'react';
import { ITextHighlight, isOnRange } from '../helpers';
import { getTooltipPositions } from './helpers';

export interface IUseTooltipOptions {
  id: string;
}

export type THandleCloseTooltip = () => void;
export type THandleCloseTooltipOnHighlight = (e: MouseEvent) => boolean;
export type THandleOpenTooltipOnHighlight = (
  index: number,
  textHighlights: Array<ITextHighlight>
) => void;
export type ITooltipPosition = {
  top: number;
  left: number;
};
export const useTooltipOptions = ({ id }: IUseTooltipOptions) => {
  const [tooltipPositions, setTooltipPositions] =
    useState<ITooltipPosition | null>(null);

  const isVisibleTooltip = useMemo(() => tooltipPositions, [tooltipPositions]);

  const closeTooltip = () => setTooltipPositions(null);

  const openTooltipByTextSelectedOnHighlight = (
    textSelectedOnHighlight: ITextHighlight
  ) => {
    const positions = getTooltipPositions(textSelectedOnHighlight);
    if (!positions) return;

    setTooltipPositions(positions);
  };

  const handleOpenTooltip = (
    index: number,
    textHighlights: Array<ITextHighlight>
  ) => {
    const textSelectedOnHighlight = textHighlights.find(
      ({ positionStart, positionEnd }) =>
        isOnRange(positionStart, positionEnd, index)
    );
    if (!textSelectedOnHighlight) return;

    openTooltipByTextSelectedOnHighlight(textSelectedOnHighlight);
  };

  const handleCloseTooltip = (e: MouseEvent) => {
    const target = e.target;
    if (!target) return false;

    const tooltipContainer = document.querySelector(`#${id}`);
    if (!tooltipContainer) return false;

    const isClickOutside = !tooltipContainer.contains(target as Node);

    const isValidToClose = !!(isClickOutside && !!tooltipPositions);
    if (!isValidToClose) return false;

    closeTooltip();
    return true;
  };

  return {
    closeTooltip,
    handleOpenTooltip,
    handleCloseTooltip,
    isVisibleTooltip,
    tooltipPositions,
    openTooltipByTextSelectedOnHighlight,
  };
};
