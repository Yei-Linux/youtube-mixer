import { useState, useEffect, useCallback, useMemo } from 'react';

export interface ITextSelection {
  positionStartX: number;
  positionStartY: number;
  positionEndX: number;
  positionEndY: number;
}

export interface ISelectionOptionsPosition {
  top: number;
  left: number;
}

export const useHighlightEditor = () => {
  const [selectionOptionsPosition, setSelectionOptionsPosition] =
    useState<ISelectionOptionsPosition | null>(null);

  const [isTextSelecting, setIsTextSelecting] = useState(false);
  const [currentTextSelection, setCurrentTextSelection] =
    useState<ITextSelection | null>(null);
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

  const handleAddHighlight = () => {
    if (!currentTextSelection) return;
    setTextSelections((prev) => [...prev, currentTextSelection]);
    setCurrentTextSelection(null);
  };

  const handleSetPositionsSelectionOptions = () => {
    const positionEndX = currentTextSelection?.positionEndX;
    const positionEndY = currentTextSelection?.positionEndY;

    if (!positionEndX || !positionEndY) return;

    const id = `#token_${positionEndX}_${positionEndY}`;
    const HTMLElement = document.querySelector(id);
    if (!HTMLElement) return;
    const transcriptionContainerElement = document.querySelector(
      '#transcription_container'
    );
    if (!transcriptionContainerElement) return;

    const scroll = transcriptionContainerElement.scrollTop;
    const { left, top } = HTMLElement.getBoundingClientRect();
    setSelectionOptionsPosition({ left, top: top - 110 + scroll });
  };

  const handleOnMouseUp = () => {
    setIsTextSelecting(false);
    handleSetPositionsSelectionOptions();
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleOnMouseUp);

    return () => window.removeEventListener('mouseup', handleOnMouseUp);
  }, [currentTextSelection]);

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
    isOnHighlightRange,
    isOnSelectionRange,
    handleMouseDownToStartSelection,
    handleMouseOverToStartSelection,
    isVisibleSelectionOptionsPosition,
    selectionOptionsPosition,
    handleAddHighlight,
  };
};
