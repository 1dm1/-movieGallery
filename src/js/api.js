
import { queryString } from '../js/routes.js'

const BASE_URL = 'http://localhost:3000'

export const METHODS = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  patch: 'PATCH',
  delete: 'DELETE',
}

export const API_CONFIGS = {
  movies: (params) => `/movies/${queryString(params)}}`,
  moviesId: (id) => `/movies/${id}`
}


export function api (method, url, body = {}) {
  const data = {method}
  if(![METHODS.get, METHODS.delete].includes(method)) {
    data.body = JSON.stringify(body)
    data.headers = {'Content-type': 'application/json; charset=UTF-8'}
  }
  return fetch(`${BASE_URL}${url}`, data).then(response => response.json())
  .catch((e) => {
    console.log(e)
  })
}