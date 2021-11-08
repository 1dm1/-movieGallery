import { templateCreator, isObject } from '../index.js'

const getPopupTemplate = (data) => {
  const { title, subtitle, buttons } = data
  const popupElements = {
    title: templateCreator({
      tag: 'div',
      class: 'popup_title',
      content: title,
    }),
    subtitle: templateCreator({
      tag: 'div',
      class: 'popup_subtitle',
      content: subtitle,
    }),
    buttons: templateCreator({
      tag: 'div',
      class: 'popup_btn_wrap',
      child: buttons,
    }),
  }

  const popupContent = []
  Object.keys(data).forEach((elemName) => {
    const elemTemplate = popupElements[elemName]
    if (elemTemplate) {
      popupContent.push(elemTemplate)
    }
  })

  return templateCreator({
    tag: 'div',
    class: 'popup_wrap hide',
    child: [
      {
        tag: 'div',
        class: 'popup_block',
        child: popupContent,
      }
    ]
  })
}

const getActionBtn = (button) => {
  if (!isObject(button)) return
  const btnElement = templateCreator({
    tag: 'button',
    class: 'popup_btn',
    content: button?.content
  })

  btnElement.addEventListener('click', button?.handler)
  return btnElement
}

export const createPopup = (data) => {
  if (!isObject(data)) return
  const { title, subtitle, actions } = data
  let buttons
  if (actions?.length) {
    buttons = actions.map(getActionBtn)
  }
  const popup = getPopupTemplate({ title, subtitle, buttons })
  popup.addEventListener('click', ({ target }) => {
    target.className === 'popup_wrap' && data.clickToWrap()
  })

  return popup
}
