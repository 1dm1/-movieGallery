


const origin = window.location.origin
const queryString = (params) => {
  const isObject = Boolean(typeof params === 'object' && Object.keys(params).length && !Array.isArray(params));
  return isObject ? `?${Object.keys(params).map(key => key + '=' + params[key]).join('&')}` : ''
}

const routes = {
  home: `${origin}`,
  movieDetails: (params) => `${origin}/movie-details.html${queryString(params)}`,
  createMovie: `${origin}/create-movie.html`,
  editMovie: (params) => `${origin}/edit-movie.html${queryString(params)}`,
  testPage: `${origin}/test-page.html`,
}

export const redirect = (page,params) => {
  if(params) {
    for(let i in routes) {(i === page) ? window.location.href = routes[i](params) : ''}
  }else {
    window.location.href = routes[page]
  }
}


