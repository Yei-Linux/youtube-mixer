const charValidators: any = {
  '{': ['{', '}'],
  '[': ['[', ']'],
};

/**
 * @summary Parse text string and convert it to json finding ytInitialData.
 * @param text
 * @param ytSearchData: Splitter key
 */
export const parseYTSourceText = (text: string, ytSearchData: string[]) => {
  if (!ytSearchData.length) throw new Error('ytSearchData parameter is empty');

  const searchMatch = ytSearchData.find(
    (search) => text.split(search).length > 1
  );
  if (!searchMatch)
    throw new Error('ytSearchData parameter didn´t match with any search');

  const [, right] = text.split(searchMatch);

  const ytInitialDataArr = right
    .trim()
    .replace(/\n/g, '')
    .replace(/\\/g, '')
    .replace(/" /g, '"');
  const textSplitter = ytInitialDataArr.split('');

  const jsonParsed = validateEachCharacter(textSplitter);

  try {
    return JSON.parse(jsonParsed);
  } catch (error) {
    console.log('test', jsonParsed);
    throw new Error('Error parsing json string');
  }
};

//TODO: Refactor and add validation of doble quotes inside double quotes and so on...
//TODO: Posible fix with regex .replace(/\\/g, ''). Check it out.

/**
 * @summary Loop each character and extract only the object part from string
 * @param ytInitialDataArr
 * @returns
 */
export const validateEachCharacter = (ytInitialDataArr: string[]) => {
  let iterator = 0;
  let jsonCollected = '';

  const recursion = (starterChar: string) => {
    let matcherChar = starterChar;
    let jumperChar = starterChar === '{' ? '[' : '{';

    let isInString = undefined;
    let counterCharValidator = 0;
    let matchers = charValidators[matcherChar];
    let jumpers = charValidators[jumperChar];

    while (iterator < ytInitialDataArr.length) {
      const char = ytInitialDataArr[iterator];
      const nextChar = ytInitialDataArr?.[iterator + 1];

      const nextCharIsAValidCloseString =
        [':', '}', ']', ','].includes(nextChar) && char === '"';

      const matchWithJumperChar = jumpers[0] === char && !isInString;
      if (matchWithJumperChar) {
        recursion(jumperChar);
        continue;
      }

      const matchWithValidChar = matchers.includes(char) && !isInString;
      if (matchWithValidChar && char === matchers[0]) {
        counterCharValidator++;
      }
      if (matchWithValidChar && char === matchers[1]) {
        counterCharValidator--;
      }

      const isInsideString =
        char === '"' && isInString && !nextCharIsAValidCloseString;
      jsonCollected += isInsideString ? `'` : char;

      const isInStringModified: boolean = !!(char === '"'
        ? !isInString
          ? true
          : nextCharIsAValidCloseString
          ? false
          : isInString
        : isInString);
      isInString = isInStringModified;

      iterator++;
      if (counterCharValidator === 0) {
        return jsonCollected;
      }
    }

    return jsonCollected;
  };

  return recursion('{');
};
