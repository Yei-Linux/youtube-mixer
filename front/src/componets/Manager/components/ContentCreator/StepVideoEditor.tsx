import { useYtVideoStore } from '@/store';
import { FC } from 'react';
import styles from './contentcreator.module.css';
import classNames from 'classnames';
import { Word } from './Word';
import { useVideoEditor } from '@/hooks/useVideoEditor';
import { useHighlightEditor } from '@/hooks/useHighlightEditor';
import { SelectionOption } from './SelectionOptions';
import { Button } from '@/componets/ui/Button';
import { useRemoveVideoSections } from '@/hooks/useRemoveVideoSections';
import { IRangeConfig } from '@/services';
import { useGenerateHighlights } from '@/hooks';

export interface IVideoEditor {
  video: File;
}

export const VideEditor: FC<IVideoEditor> = ({ video }) => {
  const transcription = useYtVideoStore((store) => store.transcription);
  const { videoRef } = useVideoEditor({ video });
  const {
    textRemovedOptionsPosition,
    textSelectionOptionsPosition,
    isOnHighlightRange,
    isOnSelectionRange,
    isOnRemovePhraseRange,
    handleMouseDownToStartSelection,
    handleMouseOverToStartSelection,
    isVisibleSelectionOptionsPosition,
    selectionOptionsPosition,
    handleAddHighlight,
    handleRemoveFromTextSelections,
    handleShowTooltipForHightlight,
    handleRemovePhrasesOrWords,
    textSelections,
    phraseRemoved,
    handleShowTooltipForRemoved,
    handleRemoveFromTextRemoved,
  } = useHighlightEditor();

  const { handleFetchRemoveVideoSections } = useRemoveVideoSections();
  const { handleFetchGenerateHighlights } = useGenerateHighlights();

  const transformPhrasesToRemove = (): IRangeConfig[] => {
    const transformed = (
      phraseRemoved.filter(
        ({ start, end }) => start != null && end != null
      ) as IRangeConfig[]
    ).map(({ start, end }) => ({ start, end }));

    return transformed;
  };

  const transformTextSelections = (): IRangeConfig[] => {
    const transformed = (
      textSelections.filter(
        ({ start, end }) => start != null && end != null
      ) as IRangeConfig[]
    ).map(({ start, end }) => ({ start, end }));

    return transformed;
  };

  const handleFetchRemove = async () => {
    const rangeConfig = transformPhrasesToRemove();
    await handleFetchRemoveVideoSections({
      rangeConfig,
      type: 'remove',
    });
  };

  const handleFetchHightlights = async () => {
    const rangeConfig = transformTextSelections();
    await handleFetchGenerateHighlights({
      rangeConfig,
      type: 'cut',
    });
  };

  return (
    <div
      className={classNames(
        'flex justify-between gap-3 w-full',
        styles.content_creator_section
      )}
    >
      <div className={classNames('min-w-[50%]')}>
        <h4 className="font-bold mb-4">Video Transcription:</h4>
        <div
          style={{ wordBreak: 'break-word' }}
          className="max-h-[80%] overflow-auto relative"
          id="transcription_container"
        >
          <SelectionOption
            id="selection_options"
            top={selectionOptionsPosition?.top ?? -1}
            left={selectionOptionsPosition?.left ?? -1}
            isHidden={!isVisibleSelectionOptionsPosition}
          >
            <li className="" onClick={handleAddHighlight}>
              Add to Highlights
            </li>
            <li className="" onClick={handleRemovePhrasesOrWords}>
              Remove Phrase
            </li>
          </SelectionOption>

          <SelectionOption
            id="text_removed_options"
            top={textRemovedOptionsPosition?.top ?? -1}
            left={textRemovedOptionsPosition?.left ?? -1}
            isHidden={!textRemovedOptionsPosition}
          >
            <li className="" onClick={handleRemoveFromTextRemoved}>
              Delete from removing
            </li>
          </SelectionOption>

          <SelectionOption
            id="text_selection_options"
            top={textSelectionOptionsPosition?.top ?? -1}
            left={textSelectionOptionsPosition?.left ?? -1}
            isHidden={!textSelectionOptionsPosition}
          >
            <li className="" onClick={handleRemoveFromTextSelections}>
              Remove from Highlights
            </li>
          </SelectionOption>

          {transcription?.timeline.map(({ words }, indexParent) =>
            words.map((word, index) => (
              <Word
                key={`${indexParent}_${index}`}
                id={`token_${indexParent}_${index}`}
                word={word}
                className={classNames({
                  'bg-primary-200': isOnHighlightRange(indexParent, index),
                  'bg-indigo-300': isOnSelectionRange(indexParent, index),
                  'bg-red-300': isOnRemovePhraseRange(indexParent, index),
                })}
                onClick={() => {
                  const isTextSelected = isOnSelectionRange(indexParent, index);
                  if (isTextSelected) {
                    handleShowTooltipForHightlight(indexParent, index);
                    return;
                  }

                  const isTextRemoved = isOnRemovePhraseRange(
                    indexParent,
                    index
                  );
                  if (isTextRemoved) {
                    handleShowTooltipForRemoved(indexParent, index);
                    return;
                  }
                }}
                onMouseDown={() =>
                  handleMouseDownToStartSelection(
                    indexParent,
                    index,
                    word.start
                  )
                }
                onMouseOver={() =>
                  handleMouseOverToStartSelection(indexParent, index, word.end)
                }
              />
            ))
          )}
        </div>
      </div>
      <div className={classNames('min-w-[50%]')}>
        <div className="flex flex-col gap-3">
          <video controls className="w-full" ref={videoRef} id="video" />
          <p className="text-sm">
            Video Duration: <strong></strong>
          </p>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <p className="text-center text-md">
            You removed <strong>{phraseRemoved?.length ?? 0} phrases </strong>
            from this video
          </p>
          <p className="text-center text-md">
            You have marked{' '}
            <strong>{textSelections?.length ?? 0} Highlights</strong> from this
            video
          </p>
          <Button
            onClick={handleFetchHightlights}
            isDisabled={!textSelections.length}
          >
            Generate Shorts
          </Button>
          <Button
            onClick={handleFetchRemove}
            className={classNames(
              'bg-[white]',
              'text-[#848aff]',
              'border border-[#848aff]'
            )}
            isDisabled={!phraseRemoved.length}
          >
            Remove Prhases
          </Button>
        </div>
      </div>
    </div>
  );
};
