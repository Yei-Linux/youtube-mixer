import { useState } from 'react';
import { ITextHighlight } from './helpers';

export type THandlerMouseDownOnHighlight = (position: number) => void;
export type THandlerMouseOverOnHighlight = (position: number) => void;
export const useCurrentHighlight = () => {
  const [isTextHighlight, setIsTextHighlight] = useState(false);
  const [currentTextHighlight, setCurrentTextHighlight] =
    useState<ITextHighlight | null>(null);

  const updateIsTextHightlight = (value: boolean) => setIsTextHighlight(value);
  const updateTextHightlight = (value: ITextHighlight | null) =>
    setCurrentTextHighlight(value);

  const handleContinueHighlight = () => setIsTextHighlight(true);

  const handleStopHighlight = () => setIsTextHighlight(false);

  const handleMouseDownOnHighlight: THandlerMouseDownOnHighlight = (
    position: number
  ) => {
    setIsTextHighlight(true);

    return setCurrentTextHighlight({
      positionStart: position,
      positionEnd: -1,
    });
  };

  const handleMouseOverOnHighlight: THandlerMouseOverOnHighlight = (
    position: number
  ) => {
    if (!isTextHighlight) return;

    setCurrentTextHighlight((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        positionEnd: position,
      };
    });
  };

  return {
    handleMouseDownOnHighlight,
    handleMouseOverOnHighlight,
    handleContinueHighlight,
    handleStopHighlight,
    currentTextHighlight,
    isTextHighlight,
    updateTextHightlight,
    updateIsTextHightlight,
  };
};
