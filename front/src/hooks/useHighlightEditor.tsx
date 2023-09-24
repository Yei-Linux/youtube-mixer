import { useState, useEffect, useCallback, useMemo } from 'react';

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

    const scroll = transcriptionContainerElement.scrollTop;
    const { left, top } = HTMLElement.getBoundingClientRect();

    return { left, top: top - 110 + scroll };
  };

  const handleOnMouseUp = (e: MouseEvent) => {
    setIsTextSelecting(false);
    const textSelectionOptionsContainer = document.querySelector(
      '#text_selection_options'
    );
    const isClickedInside = textSelectionOptionsContainer?.contains(
      e.target as any
    );

    !isClickedInside &&
      textSelectionOptionsPosition &&
      setTextSelectionOptionsPosition(null);

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
  }, [currentTextSelection, textSelectionOptionsPosition]);

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
    textSelectionOptionsPosition,
    isOnHighlightRange,
    isOnSelectionRange,
    handleMouseDownToStartSelection,
    handleMouseOverToStartSelection,
    isVisibleSelectionOptionsPosition,
    selectionOptionsPosition,
    handleAddHighlight,
    handleRemoveFromTextSelections,
    handleShowTooltipForHightlight,
  };
};
