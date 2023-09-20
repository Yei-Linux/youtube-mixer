/**
 * @param text: word
 * @param start: start time word
 * @param end: end time word
 */
export interface IWord {
  text: string;
  start: number;
  end: number;
  confidence?: number;
}

/**
 * @param id: identfier
 * @param start: start time sentence
 * @param end: end time sentence
 * @param text: sentence
 * @param words: sentence'words
 */
export interface ITimeline {
  id: number;
  start: number;
  end: number;
  text: string;
  words: Array<IWord>;
}

export interface ITranscriptionDataResponse {
  subtitles: string;
  timeline: Array<ITimeline>;
}

export type ITranscriptionResponse = IResponse<ITranscriptionDataResponse>;

export interface IResponse<T> {
  data: T;
  statusText: string;
}
