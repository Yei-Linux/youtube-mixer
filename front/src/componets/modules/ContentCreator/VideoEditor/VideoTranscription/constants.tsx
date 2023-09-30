import { IRenderTooltip } from '@/componets/modules/shared/HighlightText/HighlightText';
import type { ISetter } from '@/componets/modules/shared/HighlightText/useFeaturesHighlights';
import { ICurrentHightlightType } from '.';

export const DEFAULT_HIGHLIGHT_TYPE_VALUE = {
  type: 'current' as const,
  index: 0,
};

type TTooltipVariations = IRenderTooltip & {
  set: ({ key, payload, type }: ISetter) => void;
  setCurrentHightlightType: (value: ICurrentHightlightType) => void;
};
export const tooltipContentsVariation = ({
  currentTextHighlight,
  updateTextHightlight,
  closeTooltip,
  set,
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
          set({
            key: 'textVideoToRemove',
            payload: [],
            type: 'RESET',
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
          set({
            key: 'textVideoToMark',
            payload: [],
            type: 'RESET',
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
