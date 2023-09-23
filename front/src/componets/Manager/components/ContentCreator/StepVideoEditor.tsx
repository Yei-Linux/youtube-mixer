import { useYtVideoStore } from '@/store';
import { FC } from 'react';
import styles from './contentcreator.module.css';
import classNames from 'classnames';
import { Word } from './Word';
import { useVideoEditor } from '@/hooks/useVideoEditor';
import { useHighlightEditor } from '@/hooks/useHighlightEditor';
import { SelectionOption } from './SelectionOptions';

export interface IVideoEditor {
  video: File;
}

export const VideEditor: FC<IVideoEditor> = ({ video }) => {
  const transcription = useYtVideoStore((store) => store.transcription);
  const { videoRef } = useVideoEditor({ video });
  const {
    isOnHighlightRange,
    isOnSelectionRange,
    handleMouseDownToStartSelection,
    handleMouseOverToStartSelection,
    isVisibleSelectionOptionsPosition,
    selectionOptionsPosition,
    handleAddHighlight,
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
            top={selectionOptionsPosition?.top ?? -1}
            left={selectionOptionsPosition?.left ?? -1}
            isHidden={!isVisibleSelectionOptionsPosition}
            onAddToHightLight={handleAddHighlight}
          />
          {transcription?.timeline.map(({ words }, indexParent) =>
            words.map((word, index) => (
              <Word
                key={`${indexParent}_${index}`}
                id={`token_${indexParent}_${index}`}
                word={word}
                className={classNames({
                  'bg-primary-200': isOnHighlightRange(indexParent, index),
                  'bg-indigo-300': isOnSelectionRange(indexParent, index),
                })}
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
      </div>
    </div>
  );
};
