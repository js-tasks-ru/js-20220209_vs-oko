/**
   * sortStrings - sorts array of string by two criteria "asc" or "desc"
   * @param {string[]} arr - the array of strings
   * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
   * @returns {string[]}
   */
export function sortStrings(arr, param = 'asc') {
  // eslint-disable-next-line no-nested-ternary
  return param === 'asc' ? [...arr].sort((a, b) => a.localeCompare(b, ['ru-u-kf-upper', 'en-u-kf-upper']))
    : param === 'desc' ? [...arr].sort((a, b) => b.localeCompare(a, ['ru-u-kf-upper', 'en-u-kf-upper'])) : '';
}
