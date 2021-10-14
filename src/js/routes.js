const origin = window.location.origin

export const ROUTE_NAMES = {
  home: 'home',
  movieDetails: 'movieDetails',
  createMovie: 'createMovie',
  editMovie: 'editMovie',
}

export const queryString = (params) => {
  const isObject = Boolean(typeof params === 'object' && Object.keys(params).length && !Array.isArray(params))
  return isObject ? `?${Object.keys(params).map(key => key + '=' + params[key]).join('&')}` : ''
}

const routes = {
  [ROUTE_NAMES.home]: () => `${origin}`,
  [ROUTE_NAMES.movieDetails]: (params) => `${origin}/movie-details.html${queryString(params)}`,
  [ROUTE_NAMES.createMovie]: () => `${origin}/create-movie.html`,
  [ROUTE_NAMES.editMovie]: (params) => `${origin}/edit-movie.html${queryString(params)}`,
}

export const redirect = (page, params) => {
  if (!Object.keys(ROUTE_NAMES).includes(page)) return
  window.location.href = routes[page](params)
}




