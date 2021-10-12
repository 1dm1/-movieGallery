export const getURLParams = (key) => {
  const urlSearchParams = new URLSearchParams(window.location.search)
  return key ? urlSearchParams.get(key) : Object.fromEntries(urlSearchParams.entries())
}

const BASE_URL = 'http://localhost:3000'

export function api (method, url, body = {}) {
  const data = {method}
  if(!['GET','DELETE'].includes(method)) {
    data.body = JSON.stringify(body);
    data.headers = {'Content-type': 'application/json; charset=UTF-8'}
  }
  return fetch(`${BASE_URL}${url}`, data).then(response => response.json())
  .catch((e) => {
    console.log(e)
  })
}

export function elementCreater (data) {
  let tag
  if(!data?.tag) return
  tag = document.createElement(data.tag)
  if(data.tag === 'img') {
    tag.src = data.src
  }

  data.class && tag.classList.add(data.class)
  data.id && tag.setAttribute('id', data.id)
  if(data.content) tag.innerHTML = data.content
  if(data.attribute) {
    data.attribute.forEach(item => {
      for(let i in item) {
        tag.setAttribute(i,item[i])
      }
    })
  }

  if(data.child?.length) {
    data.child.forEach(item => {
        tag.append(item)
    })
  }
  return tag
}

export const parseDate = (date) => {
  if(date !== 'Invalid Date') {
    return new Date(date).toLocaleDateString()
  }else {
    return ''
  }
}


export const autoGrow = (element) => {
  element.style.height = '5px'
  element.style.height = (element.scrollHeight)+'px'
}