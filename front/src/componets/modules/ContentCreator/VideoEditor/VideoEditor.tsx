import { FC, useState } from 'react';
import classNames from 'classnames';
import {
  Modal,
  ModalBody,
  ModalContent,
  Switch,
  useDisclosure,
} from '@nextui-org/react';

import { useYtVideoStore } from '@/store';
import { useRemoveVideoSections } from '@/hooks/useRemoveVideoSections';
import { useVideoEditor } from '@/hooks/useVideoEditor';
import { useHighlightEditor } from '@/hooks/useHighlightEditor';
import { useGenerateHighlights } from '@/hooks/useGenerateHightlights';
import { IRangeConfig } from '@/services';

import { Button } from '@/componets/ui/Button';

import styles from './contentcreator.module.css';
import { Word } from './Word';
import { ToopltipOptions } from './TooltipOptions';

export interface IVideoEditor {
  video: File;
  onReturnToLoadNewVideo: () => void;
}

export const VideEditor: FC<IVideoEditor> = ({
  video,
  onReturnToLoadNewVideo,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSelectedShowRemovePhrases, setIsSelectedShowRemovePhrases] =
    useState(true);
  const transcription = useYtVideoStore((store) => store.transcription);
  const { videoRef } = useVideoEditor({ video });
  const {
    updateTextSelections,
    textRemovedOptionsPosition,
    textSelectionOptionsPosition,
    isOnHighlightRange,
    isOnSelectionRange,
    isOnRemovePhraseRange,
    isOnRange,
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
    handleOnDownloadVideoRemoved,
    textToHide,
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
    await handleFetchRemoveVideoSections(
      {
        rangeConfig,
        type: 'remove',
      },
      videoRef,
      video,
      handleOnDownloadVideoRemoved
    );
  };

  const handleFetchHightlights = async () => {
    const rangeConfig = transformTextSelections();
    await handleFetchGenerateHighlights(
      {
        rangeConfig,
        type: 'cut',
      },
      videoRef,
      () => updateTextSelections([])
    );
  };

  return (
    <div
      className={classNames(
        'flex flex-col md:flex-row-reverse gap-3 w-full',
        styles.content_creator_section
      )}
    >
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="flex flex-col gap-3 p-4">
                  <p>
                    Are you sure do you want to abandon your video edition
                    session?
                  </p>
                  <div className="w-full flex justify-end gap-3">
                    <Button
                      className={classNames(
                        'bg-[white]',
                        '!text-[#848aff]',
                        'border border-[#848aff]'
                      )}
                      onClick={() => {
                        onClose();
                        onReturnToLoadNewVideo();
                      }}
                    >
                      Yes 🥶
                    </Button>
                    <Button
                      onClick={() => {
                        onClose();
                      }}
                    >
                      No 😎
                    </Button>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className={classNames('min-w-[50%]')}>
        <div className="flex flex-col gap-3">
          <div className="w-full flex justify-end">
            <span
              className="text-sm font-bold text-primary underline cursor-pointer"
              onClick={() => onOpen()}
            >
              Return to Load new Video {'->'}
            </span>
          </div>
          <video controls className="w-full" ref={videoRef} id="video" />
          <div className="flex justify-between">
            <Switch
              isSelected={isSelectedShowRemovePhrases}
              onValueChange={setIsSelectedShowRemovePhrases}
            >
              <span className="text-sm">Show Phrases Removed</span>
            </Switch>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <p className="text-center text-sm md:text-md">
            You removed <strong>{phraseRemoved?.length ?? 0} phrases </strong>
            from this video
          </p>
          <p className="text-center text-sm md:text-md">
            You have marked{' '}
            <strong>{textSelections?.length ?? 0} Highlights</strong> from this
            video
          </p>
          <Button
            onClick={handleFetchHightlights}
            isDisabled={!textSelections.length}
          >
            Download Shorts
          </Button>
          <Button
            onClick={handleFetchRemove}
            className={classNames(
              'bg-[white]',
              '!text-[#848aff]',
              'border border-[#848aff]'
            )}
            isDisabled={!phraseRemoved.length}
          >
            Remove Phrases
          </Button>
        </div>
      </div>
      <div className={classNames('min-w-[50%]')}>
        <h4 className="font-bold mb-4">Video Transcription:</h4>
        <div
          style={{ wordBreak: 'break-word' }}
          className="max-h-[80%] overflow-auto relative"
          id="transcription_container"
        >
          <ToopltipOptions
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
          </ToopltipOptions>

          <ToopltipOptions
            id="text_removed_options"
            top={textRemovedOptionsPosition?.top ?? -1}
            left={textRemovedOptionsPosition?.left ?? -1}
            isHidden={!textRemovedOptionsPosition}
          >
            <li className="" onClick={handleRemoveFromTextRemoved}>
              Delete from removing
            </li>
          </ToopltipOptions>

          <ToopltipOptions
            id="text_selection_options"
            top={textSelectionOptionsPosition?.top ?? -1}
            left={textSelectionOptionsPosition?.left ?? -1}
            isHidden={!textSelectionOptionsPosition}
          >
            <li className="" onClick={handleRemoveFromTextSelections}>
              Remove from Highlights
            </li>
          </ToopltipOptions>

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
                  hidden:
                    !isSelectedShowRemovePhrases &&
                    isOnRange(indexParent, index, textToHide),
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
    </div>
  );
};
