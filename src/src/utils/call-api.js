import { urls } from '../utils/urls';

/**
 *
 * @returns {Promise<{headers: null, body: null, error: null}>}
 * @param type
 * @param sessionData
 * @param value
 */
async function callApi(type, sessionData, ...values) {
  let response = {
    headers: null,
    body: null,
    error: null
  };

  const { token } = sessionData;

  if (token) {
    const options = urls[type](...values);
    try {
      const headers = {
        ...options.additionHeaders,
        Authorization: `Bearer ${token}`
      };

      const res = await fetch(options.url, {
        ...options.opts,
        headers
      });
      response.headers = {};
      response.statuses = {
        status: res.status,
        statusText: res.statusText
      };

      for (const key of res.headers.keys()) {
        response.headers[key] = res.headers.get(key);
      }
      if (res.ok) {
        let body = await res.json();

        body.result = body.result || {};
        body.result.items = body.result.items || [];
        if (options.callback) {
          body.result.items = options.callback(body.result.items);
        }

        response.body = body;
      } else {
        throw `Request to Ordering API failed: ${res.status} ${res.statusText}`;
      }
    } catch (error) {
      response.error = error.message || error;
    }
  } else {
    response.error = `No access token supplied". API request not attempted.`;
  }

  return response;
}

export { callApi };

// todo: if reponse header x-content-length === 0 then don't do res.json
//   this avoids an error when response body is empty
// todo: add errors in response body to response.error
//   this API adds more detailed error messages in the response body
