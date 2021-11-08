import { redirect,ROUTE_NAMES } from '../../routes.js'
import { templateCreator,createPopup } from '../../utils/index.js'
import { api, METHODS,API_CONFIGS } from '../../api.js'
import { MENU, DOTS, ITEM_FILMS,POPUP } from './templates.js'
import { MENU_ACTIONS, HIDE_CLASS_NAME} from './constants.js'
import { elementVisible } from '../home/utils.js'

const containerEl = document.querySelector('.film_catalog')
const rootEl = document.querySelector('.root')
let currentId = null

api(METHODS.get, API_CONFIGS.movies({ _limit: 10 })).then(arrFilms => {
  buildList(arrFilms)
})

const containerElDoubleClickHandler = () => {
  containerEl.addEventListener('dblclick',({ target }) => {
    if (target.className.includes('item_wrap')) {
      currentId && redirect(ROUTE_NAMES.movieDetails,{ id: currentId })
    }
  })
}

const containerElClickHandler = () => {
  let prevSelectItem
  containerEl.addEventListener('click',(event) => {
    const { target } = event
    if (prevSelectItem && !target.className.includes('dots_wrap') ) {
      prevSelectItem.classList.remove('active')
      elementVisible({ className: '.dots_wrap', show: false, parent: prevSelectItem })
      elementVisible({ className: '.menu_wrap', show: false, parent: prevSelectItem })
    }
    
    if (target.className.includes('item_wrap')) {
      target.classList.add('active')
      elementVisible({ className: '.dots_wrap', show: true, parent: target })
      prevSelectItem = target
      currentId = target.getAttribute('id') 
    }
  })
}

const clickMenuHandler = ({ target }) => {
  const { offsetParent } = target
  const menuWrapBlock = [...offsetParent.children].find((item) => item.className.includes('menu_wrap'))
  const show = menuWrapBlock.className.includes(HIDE_CLASS_NAME)
  elementVisible({ element: menuWrapBlock, show, parent: target })
}

const onCancelPopup = () => {
  elementVisible({ className: '.popup_wrap', show: false, parent: rootEl})
}
const onConfirmPopup = () => {
  onCancelPopup()
  api(METHODS.delete, API_CONFIGS.moviesId(currentId))
  window.location.reload()
}

const onClickMenu = ({ target } , popupBlock) => {
  const currentAction = target.getAttribute('data_action')
  if (currentAction === MENU_ACTIONS.delete) {  
    elementVisible({ element: popupBlock, show: true})
  }
  const action = MENU_ACTIONS[currentAction]
  redirect(ROUTE_NAMES[action],{id: currentId})
}

const buildList = (arrFilms) => {
  const popupBlock = POPUP(onCancelPopup,onConfirmPopup)

  arrFilms.forEach((film) => {
    const dotsBlock = templateCreator(DOTS)
    const menuBlock = templateCreator(MENU)
    menuBlock.addEventListener('click', (event) => onClickMenu(event, popupBlock))
    dotsBlock.addEventListener('click', clickMenuHandler)

    const itemWrap = templateCreator(
      {
        tag: 'div',
        class: 'item_wrap',
        attribute: {id: film.id},
        child:[dotsBlock, menuBlock, ITEM_FILMS(film)]
      }
    )
    containerEl.append(itemWrap)
  })
  rootEl.append(popupBlock)

  containerElDoubleClickHandler()
  containerElClickHandler()
}