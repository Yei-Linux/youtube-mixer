import { useYtVideoStore } from '@/store';
import { FC, useRef } from 'react';
import styles from './contentcreator.module.css';
import classNames from 'classnames';
import { Word } from './Word';
import { useVideoEditor } from '@/hooks/useVideoEditor';
import { useHighlightEditor } from '@/hooks/useHighlightEditor';
import { SelectionOption } from './SelectionOptions';
import { Button } from '@/componets/ui/Button';

export interface IVideoEditor {
  video: File;
}

export const VideEditor: FC<IVideoEditor> = ({ video }) => {
  const transcription = useYtVideoStore((store) => store.transcription);
  const { videoRef } = useVideoEditor({ video });
  const {
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
  } = useHighlightEditor();

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
                  hidden: isOnRemovePhraseRange(indexParent, index),
                })}
                onClick={() => {
                  const isTextSelected = isOnSelectionRange(indexParent, index);
                  if (!isTextSelected) return;
                  handleShowTooltipForHightlight(indexParent, index);
                }}
                onMouseDown={() =>
                  handleMouseDownToStartSelection(indexParent, index)
                }
                onMouseOver={() =>
                  handleMouseOverToStartSelection(indexParent, index)
                }
              />
            ))
          )}
        </div>
      </div>
      <div className={classNames('min-w-[50%]')}>
        <video controls className="w-full" ref={videoRef} id="video" />
        <div className="p-4 flex flex-col gap-4">
          <p className="text-center text-md">
            You removed {phraseRemoved?.length ?? 0} phrases from this video
          </p>
          <Button isDisabled={!textSelections.length}>Generate Shorts</Button>
        </div>
      </div>
    </div>
  );
};
