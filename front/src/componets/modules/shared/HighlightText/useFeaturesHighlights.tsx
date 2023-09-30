import { useReducer } from 'react';
import { ITextHighlight } from './helpers';

type TType = 'OVERRIDE' | 'RESET' | 'ADD';
interface IAction {
  type: TType;
  payload: Array<ITextHighlight>;
  key: string;
}
export interface ISetter {
  key: string;
  payload: Array<ITextHighlight>;
  type: TType;
}

export interface IUseFeaturesHighlights {
  initialFeaturesState: Record<string, Array<ITextHighlight>>;
}

export const useFeaturesHighlights = ({
  initialFeaturesState,
}: IUseFeaturesHighlights) => {
  const reducer = (
    state: Record<string, Array<ITextHighlight>>,
    action: IAction
  ): Record<string, Array<ITextHighlight>> => {
    const isExistKey = state?.[action.key];
    if (!isExistKey) return state;
    try {
      if (action.type === 'OVERRIDE') {
        return {
          ...state,
          [action.key]: action.payload,
        };
      }
      if (action.type === 'ADD') {
        return {
          ...state,
          [action.key]: [...state[action.key], ...action.payload],
        };
      }
      if (action.type === 'RESET') {
        return {
          ...state,
          [action.key]: [],
        };
      }
      return state;
    } catch (error) {
      return state;
    }
  };
  const [features, dispatch] = useReducer(reducer, initialFeaturesState);

  const set = ({ key, payload, type }: ISetter) => {
    dispatch({
      type,
      payload,
      key,
    });
  };

  const get = (key: string) => {
    const value = features?.[key];
    return value;
  };

  return { features, set, get };
};
