function readCookie(name) {
    return (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
}
import 'whatwg-fetch';

let isProduction = process.env.NODE_ENV === 'production';

if(isProduction){
  var headers = {
    mode: 'cors',
    credentials: 'include',
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'X-CSRFToken': readCookie('csrftoken')
    }
  }
}
else {
  var headers = {
    mode: 'cors',
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    }
  }
}

export const defaultParams = headers

/**
 * HTTP GET
 * @param  {string} url
 * @return {Promise}
 */
export function read(url) {
  return fetch(url, {
      ...defaultParams,
      method: 'get'
    }).then(response => {
      return response;
    }).catch(err => {
      console.error('Fetching error', new Error(err));
      return err;
    });
}


// Get method without any headers
export function readSimple(url) {
  return fetch(url, {
    method: 'get'
  }).then(response => {
    return response;
  }).catch(err => {
    console.error('Simple fetching error', new Error(err));
    return err;
  });
}

/**
 * HTTP POST
 * @param  {string} url
 * @param  {object} body
 * @return {Promise}
 */
export function create(url, body = {}) {
  console.log('body', body);
  return fetch(url, {
    ...defaultParams,
    method: 'post',
    body: JSON.stringify(body)
  });
}


/**
 * HTTP PUT
 * @param  {string} url
 * @param  {object} body
 * @return {Promise}
 */
export function update(url, body = {}) {
  return fetch(url, {
    ...defaultParams,
    method: 'put',
    body: JSON.stringify(body)
  })
}


/**
 * HTTP DELETE
 * @param  {string} url
 * @return {Promise}
 */
export function destroy(url) {
  return fetch(url, {
    ...defaultParams,
    method: 'delete'
  });
}
