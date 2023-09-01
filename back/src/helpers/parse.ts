/**
 * @summary Parse text string and convert it to json finding ytInitialData
 * @summary Filter by '"playlist":{"title": "..."}'
 * @param text
 */
export const parseYTSourceText = (text: string, ytSearchData: string[]) => {
  if (!ytSearchData.length) throw new Error('ytSearchData parameter is empty');

  const searchMatch = ytSearchData.find(
    (search) => text.split(search).length > 1
  );
  if (!searchMatch)
    throw new Error('ytSearchData parameter didn´t match with any search');

  const [, right] = text.split(searchMatch);

  const ytInitialDataArr = right.trim().split('');
  const jsonCollected = validateEachCharacter(ytInitialDataArr, '{', '[');
  return jsonCollected;
};

const charValidators: any = {
  '{': ['{', '}'],
  '[': ['[', ']'],
};

export const validateEachCharacter = (
  ytInitialDataArr: string[],
  charValidator: string,
  charToJump: string
) => {
  let jsonCollected = '';
  const matchers = charValidators[charValidator];
  const isJump = charValidators[charToJump];

  let counterCharValidator = 0;
  let prevCharValidator = charValidator;

  for (let i = 0; i < ytInitialDataArr.length; i++) {
    const char = ytInitialDataArr[i];
    jsonCollected += char;

    const matchWithBracket =
      isJump.includes(prevCharValidator) && isJump.includes(char);
    if (matchWithBracket) {
      const newJsonCollected = validateEachCharacter(
        ytInitialDataArr.slice(i),
        charToJump,
        charValidator
      );
      jsonCollected += newJsonCollected;
      continue;
    }

    const matchWithCurlyBracket =
      matchers.includes(prevCharValidator) && matchers.includes(char);
    if (matchWithCurlyBracket && char === prevCharValidator) {
      counterCharValidator++;
    }
    if (matchWithCurlyBracket && char !== prevCharValidator) {
      counterCharValidator--;
    }
    if (matchers.includes(char)) {
      prevCharValidator = char;
    }

    if (counterCharValidator === 0) {
      return jsonCollected;
    }
  }

  return jsonCollected;
};
