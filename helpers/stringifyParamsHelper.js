import queryString from 'query-string';

function stringifyParamsHelper(params) {
  const stringifiedParams = queryString.stringify(params);
  return stringifiedParams;
}

export default stringifyParamsHelper;
