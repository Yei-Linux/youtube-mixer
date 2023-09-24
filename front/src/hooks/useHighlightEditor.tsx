import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

export interface ITextSelection {
  positionStartX: number;
  positionStartY: number;
  positionEndX: number;
  positionEndY: number;
}

export type ISelectionOptionsPosition = {
  top: number;
  left: number;
};

export type ITextSelectionOptionsPosition = ISelectionOptionsPosition &
  ITextSelection;

export const useHighlightEditor = () => {
  const [selectionOptionsPosition, setSelectionOptionsPosition] =
    useState<ISelectionOptionsPosition | null>(null);
  const [textSelectionOptionsPosition, setTextSelectionOptionsPosition] =
    useState<ITextSelectionOptionsPosition | null>(null);

  const [isTextSelecting, setIsTextSelecting] = useState(false);
  const [currentTextSelection, setCurrentTextSelection] =
    useState<ITextSelection | null>(null);

  const [phraseRemoved, setPhraseWordsRemoved] = useState<ITextSelection[]>([]);
  const [textSelections, setTextSelections] = useState<ITextSelection[]>([]);

  const isVisibleSelectionOptionsPosition = useMemo(
    () =>
      !!(
        !isTextSelecting &&
        currentTextSelection?.positionEndX &&
        currentTextSelection?.positionEndY &&
        selectionOptionsPosition
      ),
    [isTextSelecting, currentTextSelection, selectionOptionsPosition]
  );

  const handleRemoveFromTextSelections = () => {
    if (!textSelectionOptionsPosition) return;

    const foundIndex = textSelections.findIndex(
      (textSelection) =>
        textSelection.positionStartX ===
          textSelectionOptionsPosition.positionStartX &&
        textSelection.positionStartY ===
          textSelectionOptionsPosition.positionStartY &&
        textSelection.positionEndX ===
          textSelectionOptionsPosition.positionEndX &&
        textSelection.positionEndY === textSelectionOptionsPosition.positionEndY
    );

    if (foundIndex < 0) return;

    setTextSelections((prev) =>
      prev.filter((_, index) => index !== foundIndex)
    );
    setTextSelectionOptionsPosition(null);
  };

  const handleShowTooltipForHightlight = (
    indexParent: number,
    index: number
  ) => {
    const found = textSelections.find((textSelection) =>
      conditionRange(textSelection, indexParent, index)
    );
    if (!found) return;

    const positions = handleGetPositionsSelectionOptions(found);
    if (!positions) return;

    setTextSelectionOptionsPosition({ ...found, ...positions });
  };

  const handleRemovePhrasesOrWords = () => {
    if (!currentTextSelection) return;
    setPhraseWordsRemoved((prev) => [...prev, currentTextSelection]);
    setCurrentTextSelection(null);
  };

  const handleAddHighlight = () => {
    if (!currentTextSelection) return;
    setTextSelections((prev) => [...prev, currentTextSelection]);
    setCurrentTextSelection(null);
  };

  const handleGetPositionsSelectionOptions = (
    textSelection: ITextSelection | null
  ) => {
    const positionEndX = textSelection?.positionEndX;
    const positionEndY = textSelection?.positionEndY;

    if (!positionEndX || !positionEndY) return;

    const id = `#token_${positionEndX}_${positionEndY}`;
    const HTMLElement = document.querySelector(id);
    if (!HTMLElement) return;
    const transcriptionContainerElement = document.querySelector(
      '#transcription_container'
    );
    if (!transcriptionContainerElement) return;

    const widthSelectionOptions = 120;
    const scroll = transcriptionContainerElement.scrollTop;
    const scrollWidth = transcriptionContainerElement.clientWidth;
    const { left, top } = HTMLElement.getBoundingClientRect();

    const diffWithSelectionWidth = scrollWidth - widthSelectionOptions;
    const leftComputed = Math.min(left, diffWithSelectionWidth);

    return { left: leftComputed, top: top - 110 + scroll };
  };

  const handleOnMouseUp = (e: MouseEvent) => {
    setIsTextSelecting(false);

    const transcriptionContainerElement = document.querySelector(
      '#transcription_container'
    );
    const isClickedInsideTranscriptionContainer =
      transcriptionContainerElement?.contains(e.target as any);
    const textSelectionOptionsContainer = document.querySelector(
      '#text_selection_options'
    );
    const isClickedInside = textSelectionOptionsContainer?.contains(
      e.target as any
    );

    const validationSelectionOptions = !!(
      transcriptionContainerElement &&
      !isClickedInsideTranscriptionContainer &&
      currentTextSelection &&
      selectionOptionsPosition
    );
    validationSelectionOptions && setCurrentTextSelection(null);

    const validationTextSelectionOptions = !!(
      textSelectionOptionsContainer &&
      !isClickedInside &&
      textSelectionOptionsPosition
    );
    validationTextSelectionOptions && setTextSelectionOptionsPosition(null);

    const positions = handleGetPositionsSelectionOptions(currentTextSelection);
    if (!positions) {
      setSelectionOptionsPosition(null);
      return;
    }
    setSelectionOptionsPosition(positions);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleOnMouseUp);

    return () => window.removeEventListener('mouseup', handleOnMouseUp);
  }, [
    currentTextSelection,
    selectionOptionsPosition,
    textSelectionOptionsPosition,
  ]);

  const conditionRange = (
    selection: ITextSelection | null,
    indexParent: number,
    index: number
  ) => {
    return (
      selection &&
      selection.positionStartX <= indexParent &&
      (selection.positionStartX === indexParent
        ? selection.positionStartY <= index
        : true) &&
      selection.positionEndX >= indexParent &&
      (selection.positionEndX === indexParent
        ? selection.positionEndY >= index
        : true)
    );
  };

  const isOnHighlightRange = useCallback(
    (indexParent: number, index: number) => {
      return conditionRange(currentTextSelection, indexParent, index);
    },
    [currentTextSelection]
  );

  const isOnSelectionRange = useCallback(
    (indexParent: number, index: number) => {
      return textSelections.some((textSelection) =>
        conditionRange(textSelection, indexParent, index)
      );
    },
    [textSelections]
  );

  const isOnRemovePhraseRange = useCallback(
    (indexParent: number, index: number) => {
      return phraseRemoved.some((item) =>
        conditionRange(item, indexParent, index)
      );
    },
    [phraseRemoved]
  );

  const handleMouseDownToStartSelection = (
    positionX: number,
    positionY: number
  ) => {
    setIsTextSelecting(true);

    return setCurrentTextSelection({
      positionStartX: positionX,
      positionStartY: positionY,
      positionEndX: -1,
      positionEndY: -1,
    });
  };

  const handleMouseOverToStartSelection = (
    positionX: number,
    positionY: number
  ) => {
    if (!isTextSelecting) return;

    setCurrentTextSelection((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        positionEndX: positionX,
        positionEndY: positionY,
      };
    });
  };

  return {
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
  };
};
