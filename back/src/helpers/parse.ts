const charValidators: any = {
  '{': ['{', '}'],
  '[': ['[', ']'],
};

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

  const jsonParsed = validateEachCharacter(ytInitialDataArr);

  try {
    return JSON.parse(jsonParsed);
  } catch (error) {
    throw new Error('Error parsing json string');
  }
};

export const validateEachCharacter = (ytInitialDataArr: string[]) => {
  let iterator = 0;
  let jsonCollected = '';

  const recursion = (starterChar: string) => {
    let matcherChar = starterChar;
    let jumperChar = starterChar === '{' ? '[' : '{';

    let counterCharValidator = 0;
    let matchers = charValidators[matcherChar];
    let jumpers = charValidators[jumperChar];

    while (iterator < ytInitialDataArr.length) {
      const char = ytInitialDataArr[iterator];

      const matchWithJumperChar = jumpers[0] === char;
      if (matchWithJumperChar) {
        recursion(jumperChar);
        continue;
      }

      const matchWithValidChar = matchers.includes(char);
      if (matchWithValidChar && char === matchers[0]) {
        counterCharValidator++;
      }
      if (matchWithValidChar && char === matchers[1]) {
        counterCharValidator--;
      }

      jsonCollected += char;
      iterator++;
      if (counterCharValidator === 0) {
        return jsonCollected;
      }
    }

    return jsonCollected;
  };

  return recursion('{');
};
