export const getURLParams = (key) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return key ? urlSearchParams.get(key) : Object.fromEntries(urlSearchParams.entries());
}






const BASE_URL = 'http://localhost:3000';

export function api (method, url, body = {}) {
  const data = {method}
  if(!['GET','DELETE'].includes(method)) {
    data.body = JSON.stringify(body);    
  }
  return fetch(`${BASE_URL}${url}`, data).then(response => response.json())
  .catch((e) => {
    console.log(e);
  })
}



export function elementCreater (data) {
    
  let block;
  if(!data?.block) return
  block = document.createElement(data.block)
  if(data.block === 'img') {
    block.src = data.src
  }

  data.class && block.classList.add(data.class)
  data.id && block.setAttribute('id', data.id)
  if(data.content) block.innerHTML = data.content
  
  if(data.attribute) {
      data.attribute.forEach(item => {
          for(let i in item) {
              block.setAttribute(i,item[i]);
          }
      })
  }

  if(data.child?.length) {
      data.child.forEach(item => {
          block.append(item)
      })
  }
  return block
}