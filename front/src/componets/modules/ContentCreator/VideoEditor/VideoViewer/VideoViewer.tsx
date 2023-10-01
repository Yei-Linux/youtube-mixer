import { Button } from '@/componets/ui/Button';
import { useVideoViewer } from '@/componets/modules/ContentCreator/VideoEditor/VideoViewer/useVideoEditor';
import { Switch, useDisclosure } from '@nextui-org/react';
import classNames from 'classnames';
import { FC, Fragment } from 'react';
import { ExitQuestionModal } from './ExitQuestionModal/ExitQuestionModal';
import { ITextHighlight } from '@/componets/modules/shared/HighlightText/helpers';
import { useRemoveVideoSections } from '@/componets/modules/ContentCreator/VideoEditor/VideoViewer/useRemoveVideoSections';
import { useGenerateHighlights } from '@/hooks';
import { IWord } from '@/types/transcription';
import { IRangeConfig } from '@/services';
import { ISetter } from '@/componets/modules/shared/HighlightText/useFeaturesHighlights';
import {
  TIndexWordsRemoved,
  TUpdateIndexWordsRemoved,
} from '../useIndexWordsRemoved';

export interface IVideoViewer {
  video: File;
  onReturnToLoadNewVideo: () => void;
  transcriptionChainning: IWord[];
  isSelectedShowTextVideoToRemove: boolean;
  setIsSelectedShowTextVideoToRemove: (prop: boolean) => void;
  textVideoToRemove: ITextHighlight[];
  textVideoToMark: ITextHighlight[];
  set: ({ key, payload, type }: ISetter) => void;
  indexWordsRemoved: TIndexWordsRemoved;
  updateIndexWordsRemoved: TUpdateIndexWordsRemoved;
}
export const VideoViewer: FC<IVideoViewer> = ({
  video,
  onReturnToLoadNewVideo,
  transcriptionChainning,
  isSelectedShowTextVideoToRemove,
  setIsSelectedShowTextVideoToRemove,
  textVideoToRemove,
  textVideoToMark,
  set,
  indexWordsRemoved,
  updateIndexWordsRemoved,
}) => {
  const { videoRef } = useVideoViewer({ video });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { handleFetchRemoveVideoSections } = useRemoveVideoSections();
  const { handleFetchGenerateHighlights } = useGenerateHighlights();

  const transform = (texts: ITextHighlight[]): IRangeConfig[] => {
    const transcriptionGenerated = texts
      .map(({ positionStart, positionEnd }) => ({
        start: transcriptionChainning[positionStart].start,
        end: transcriptionChainning[positionEnd].end,
      }))
      .flat()
      .map(({ start, end }) => ({ start, end }))
      .filter(({ start, end }) => start != null && end != null);

    return transcriptionGenerated;
  };

  const handleFetchRemove = async () => {
    const merged = [...indexWordsRemoved, ...textVideoToRemove];
    const rangeConfig = transform(merged);

    await handleFetchRemoveVideoSections(
      {
        rangeConfig,
        type: 'remove',
      },
      videoRef,
      video,
      () => {
        updateIndexWordsRemoved(merged.slice());
        set({
          type: 'RESET',
          payload: [],
          key: 'textVideoToRemove',
        });
      }
    );
  };

  const handleFetchHightlights = async () => {
    const rangeConfig = transform(textVideoToMark);
    await handleFetchGenerateHighlights(
      {
        rangeConfig,
        type: 'cut',
      },
      videoRef,
      () =>
        set({
          type: 'RESET',
          payload: [],
          key: 'textVideoToMark',
        })
    );
  };

  return (
    <Fragment>
      <ExitQuestionModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onReturnToLoadNewVideo={onReturnToLoadNewVideo}
      />

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
              isSelected={isSelectedShowTextVideoToRemove}
              onValueChange={setIsSelectedShowTextVideoToRemove}
            >
              <span className="text-sm">Show Phrases Removed</span>
            </Switch>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <p className="text-center text-sm md:text-md">
            You removed{' '}
            <strong>{textVideoToRemove?.length ?? 0} phrases </strong>
            from this video
          </p>
          <p className="text-center text-sm md:text-md">
            You have marked{' '}
            <strong>{textVideoToMark?.length ?? 0} Highlights</strong> from this
            video
          </p>
          <Button
            onClick={handleFetchHightlights}
            isDisabled={!textVideoToMark.length}
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
            isDisabled={!textVideoToRemove.length}
          >
            Remove Phrases
          </Button>
        </div>
      </div>
    </Fragment>
  );
};
