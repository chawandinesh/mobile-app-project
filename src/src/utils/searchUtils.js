/**
 * designed to be used to convert the search results page url
 * into a query string for the search API
 * with an option to pass a whitelist of allowable query string keys
 * @param {array} path - e.g. [ { key: 'CategoryId', value: '4-inverters' },{ key: 'SubCategoryId', value: null }]
 * @param {string | undefined} queryString
 * @return {array | undefined} allowed - e.g. ['BrandId','Market','Range']
 */
function createQueryString(path, queryString = null, allowed = null) {
  // converts page path and page query string to a query string
  // allowed is an optional array of
  const queryStringArray1 = path
    .filter((item) => Object.prototype.toString.call(item.value) === "[object String]")
    .map((item) => item.key + '=' + item.value.split('-')[0])
    .filter((item) => item.trim() !== '');
  let queryStringArray2 = [];  
  if (queryString) {
    queryStringArray2 = queryString
      .substring(1)
      .split('&')
      .filter((item) =>
        allowed ? allowed.indexOf(item.split('=')[0]) !== -1 : true
      );
  }
  return queryStringArray1.concat(queryStringArray2).join('&');
}

export { createQueryString };
