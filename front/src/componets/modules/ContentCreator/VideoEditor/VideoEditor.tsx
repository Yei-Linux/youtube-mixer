import { FC, useState } from 'react';
import classNames from 'classnames';

import { useYtVideoStore } from '@/store';

import styles from './contentcreator.module.css';
import { useFeaturesHighlights } from '../../shared/HighlightText/useFeaturesHighlights';
import { VideoViewer } from './VideoViewer';
import { VideoTranscription } from './VideoTranscription/VideoTranscription';
import { useIndexWordsRemoved } from './useIndexWordsRemoved';

export interface IVideoEditor {
  video: File;
  onReturnToLoadNewVideo: () => void;
}

export const VideEditor: FC<IVideoEditor> = ({
  video,
  onReturnToLoadNewVideo,
}) => {
  const [isSelectedShowTextVideoToRemove, setIsSelectedShowTextVideoToRemove] =
    useState(true);
  const { indexWordsRemoved, updateIndexWordsRemoved } = useIndexWordsRemoved();
  const transcription = useYtVideoStore((store) => store.transcription);

  const initialFeaturesState = {
    textVideoToRemove: [],
    textVideoToMark: [],
  };
  const { features, set, get } = useFeaturesHighlights({
    initialFeaturesState,
  });

  const transcriptionChainning =
    transcription?.timeline
      .map(({ words }) => words.map((word) => word))
      .flat() ?? [];
  const textChainning = transcriptionChainning.map(({ text }) => text) ?? [];

  return (
    <div
      className={classNames(
        'flex flex-col md:flex-row-reverse gap-3 w-full',
        styles.content_creator_section
      )}
    >
      <VideoViewer
        video={video}
        onReturnToLoadNewVideo={onReturnToLoadNewVideo}
        transcriptionChainning={transcriptionChainning}
        isSelectedShowTextVideoToRemove={isSelectedShowTextVideoToRemove}
        setIsSelectedShowTextVideoToRemove={setIsSelectedShowTextVideoToRemove}
        textVideoToRemove={features['textVideoToRemove']}
        textVideoToMark={features['textVideoToMark']}
        indexWordsRemoved={indexWordsRemoved}
        updateIndexWordsRemoved={updateIndexWordsRemoved}
        set={set}
      />
      <VideoTranscription
        textChainning={textChainning}
        features={features}
        set={set}
        indexWordsRemoved={indexWordsRemoved}
        isSelectedShowTextVideoToRemove={isSelectedShowTextVideoToRemove}
      />
    </div>
  );
};
