export const getURLParams = (key) => {
  const urlSearchParams = new URLSearchParams(window.location.search)
  return key ? urlSearchParams.get(key) : Object.fromEntries(urlSearchParams.entries())
}
export const templateCreator = (data) => {
  let tag
  if(!data?.tag) return
  tag = document.createElement(data.tag)
  if(data.tag === 'img') {
    tag.src = data.src
  }
  if (data.class) tag.className += data.class

  data.id && tag.setAttribute('id', data.id)
  if(data.content) tag.innerHTML = data.content
  if(data.attribute) {
    const attrKeys = Object.keys(data.attribute)
    attrKeys.forEach((key) => {
      tag.setAttribute(key, data.attribute[key])
    })
  }
  if(data.child?.length) {
    data.child.forEach(item => {
      tag.append(templateCreator(item))
    })
  }
  return tag
}

export const isValidDate = (date) => {
  const checkDate = new Date(date)
  return `${checkDate}` !== 'Invalid Date' ? checkDate.toLocaleDateString() : ''
}