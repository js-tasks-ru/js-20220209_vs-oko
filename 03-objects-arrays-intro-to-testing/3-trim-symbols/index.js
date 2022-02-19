/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  let count = 1;
  let resultString = '';
  const stringArr = string.split('');
  if (size !== 0) {
    for (const key of stringArr) {
      if (resultString.slice(-1) === key) {
        count++;
        if (size < count) {
          continue;
        }
      } else count = 1;

      resultString += key;
    }
  }
  return resultString;
}
