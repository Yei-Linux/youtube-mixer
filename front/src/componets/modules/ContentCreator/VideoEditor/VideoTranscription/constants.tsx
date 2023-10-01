import { IRenderTooltip } from '@/componets/modules/shared/HighlightText/HighlightText';
import type { ISetter } from '@/componets/modules/shared/HighlightText/useFeaturesHighlights';
import { ICurrentHightlightType } from '.';
import {
  ITextHighlight,
  isOnRange,
} from '@/componets/modules/shared/HighlightText/helpers';

export const DEFAULT_HIGHLIGHT_TYPE_VALUE = {
  type: 'current' as const,
  index: 0,
};

type TTooltipVariations = IRenderTooltip & {
  features: Record<string, ITextHighlight[]>;
  set: ({ key, payload, type }: ISetter) => void;
  currentHightlightType: ICurrentHightlightType;
  setCurrentHightlightType: (value: ICurrentHightlightType) => void;
};
export const tooltipContentsVariation = ({
  features,
  currentTextHighlight,
  updateTextHightlight,
  closeTooltip,
  set,
  currentHightlightType,
  setCurrentHightlightType,
}: TTooltipVariations) => ({
  current: (
    <>
      <li
        onClick={() => {
          if (!currentTextHighlight) return;

          set({
            key: 'textVideoToMark',
            payload: [currentTextHighlight],
            type: 'ADD',
          });
          closeTooltip();
          updateTextHightlight(null);
        }}
      >
        Add to Highlights
      </li>
      <li
        onClick={() => {
          if (!currentTextHighlight) return;

          set({
            key: 'textVideoToRemove',
            payload: [currentTextHighlight],
            type: 'ADD',
          });
          closeTooltip();
          updateTextHightlight(null);
        }}
      >
        Remove Phrase
      </li>
    </>
  ),
  textVideoToRemove: (
    <>
      <li
        onClick={() => {
          const isNotOnRange = features['textVideoToRemove'].filter(
            ({ positionStart, positionEnd }) =>
              !isOnRange(
                positionStart,
                positionEnd,
                currentHightlightType.index
              )
          );
          set({
            key: 'textVideoToRemove',
            payload: isNotOnRange,
            type: 'OVERRIDE',
          });
          closeTooltip();
          updateTextHightlight(null);
          setCurrentHightlightType(DEFAULT_HIGHLIGHT_TYPE_VALUE);
        }}
      >
        Cancel Remove Selection
      </li>
    </>
  ),
  textVideoToMark: (
    <>
      <li
        onClick={() => {
          const isNotOnRange = features['textVideoToMark'].filter(
            ({ positionStart, positionEnd }) =>
              !isOnRange(
                positionStart,
                positionEnd,
                currentHightlightType.index
              )
          );
          set({
            key: 'textVideoToMark',
            payload: isNotOnRange,
            type: 'OVERRIDE',
          });
          closeTooltip();
          updateTextHightlight(null);
          setCurrentHightlightType(DEFAULT_HIGHLIGHT_TYPE_VALUE);
        }}
      >
        Cancel Highlight Selection
      </li>
    </>
  ),
});
