import { HightlightText } from '@/componets/modules/shared/HighlightText/HighlightText';
import { ITextHighlight } from '@/componets/modules/shared/HighlightText/helpers';
import { ISetter } from '@/componets/modules/shared/HighlightText/useFeaturesHighlights';
import classNames from 'classnames';
import { FC, useState } from 'react';
import {
  DEFAULT_HIGHLIGHT_TYPE_VALUE,
  tooltipContentsVariation,
} from './constants';
import { THandleOpenTooltipOnHighlight } from '@/componets/modules/shared/HighlightText/TooltipOptions/useTooltipOptions';

export type THighlightTypes =
  | 'current'
  | 'textVideoToRemove'
  | 'textVideoToMark';
export interface ICurrentHightlightType {
  index: number;
  type: THighlightTypes;
}
export interface IVideoTranscription {
  textChainning: string[];
  features: Record<string, ITextHighlight[]>;
  set: ({ key, payload, type }: ISetter) => void;
}
export const VideoTranscription: FC<IVideoTranscription> = ({
  textChainning,
  features,
  set,
}) => {
  const [currentHightlightType, setCurrentHightlightType] =
    useState<ICurrentHightlightType>(DEFAULT_HIGHLIGHT_TYPE_VALUE);
  const handleClick = (
    isTextVideoToMark: boolean,
    isTextVideoToRemove: boolean,
    handleOpenTooltip: THandleOpenTooltipOnHighlight,
    index: number
  ) => {
    if (isTextVideoToRemove) {
      setCurrentHightlightType({ type: 'textVideoToRemove', index });
      handleOpenTooltip(index, features['textVideoToRemove']);
      return;
    }
    if (isTextVideoToMark) {
      setCurrentHightlightType({ type: 'textVideoToMark', index });
      handleOpenTooltip(index, features['textVideoToMark']);
      return;
    }
    return;
  };

  return (
    <div className={classNames('min-w-[50%]')}>
      <h4 className="font-bold mb-4">Video Transcription:</h4>
      <div
        style={{ wordBreak: 'break-word' }}
        className="max-h-[80%] overflow-auto relative"
        id="transcription_container"
      >
        <HightlightText
          words={textChainning}
          renderTooltipContent={(props) =>
            tooltipContentsVariation({
              ...props,
              set,
              setCurrentHightlightType,
            })[currentHightlightType.type]
          }
        >
          {({
            index,
            word,
            isOnRange,
            isSomeOnRange,
            handleMouseDownOnHighlight,
            handleMouseOverOnHighlight,
            currentTextHighlight,
            handleOpenTooltip,
            closeTooltip,
          }) => {
            const isCurrentHighlight =
              currentTextHighlight &&
              isOnRange(
                currentTextHighlight.positionStart,
                currentTextHighlight.positionEnd,
                index
              );
            const isTextVideoToMark =
              features['textVideoToMark'] &&
              isSomeOnRange(features['textVideoToMark'], index);
            const isTextVideoToRemove =
              features['textVideoToRemove'] &&
              isSomeOnRange(features['textVideoToRemove'], index);

            return (
              <HightlightText.Word
                key={index}
                id={`token_${index}`}
                wordContent={word}
                className={classNames({
                  'bg-primary-200': isCurrentHighlight,
                  'bg-indigo-300': isTextVideoToMark,
                  'bg-red-300': isTextVideoToRemove,

                  'highlihttype-current': isCurrentHighlight,
                  'highlihttype-textVideoToMark': isTextVideoToMark,
                  'highlihttype-textVideoToRemove': isTextVideoToRemove,
                })}
                onClick={() =>
                  handleClick(
                    isTextVideoToMark,
                    isTextVideoToRemove,
                    handleOpenTooltip,
                    index
                  )
                }
                onMouseDown={() => {
                  closeTooltip();
                  handleMouseDownOnHighlight(index);
                }}
                onMouseOver={() => handleMouseOverOnHighlight(index)}
              />
            );
          }}
        </HightlightText>
      </div>
    </div>
  );
};
