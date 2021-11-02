import { redirect,ROUTE_NAMES } from '../routes.js'
import { isValidDate,templateCreator } from '../utils.js'
import { api, METHODS,API_CONFIGS } from '../api.js'

const containerEl = document.querySelector('.film_catalog')

api(METHODS.get, API_CONFIGS.movies({ _limit: 10 })).then(arrFilms => {
  displayList(arrFilms)
})

const displayList = (arrFilms) => {
  buildList(arrFilms)
}

const containerElDoubleClickHandler = () => {
  containerEl.addEventListener('dblclick',({ target }) => {
    if (target.className.includes('item_wrap')) {
      const id = target.getAttribute('id')
      id && redirect(ROUTE_NAMES.movieDetails,{ id })
    }
  })
}

const containerElClickHandler = () => {
  let prevSelectItem
  containerEl.addEventListener('click',(event) => {

    const target = event.target

    if (prevSelectItem && !target.className.includes('dots_wrap') ) {
      prevSelectItem.classList.remove('active')
      showBlock('.dots_wrap',false,prevSelectItem)
      showBlock('.menu_wrap',false,prevSelectItem)
    }

    if (target.className.includes('item_wrap')) {
      target.classList.add('active')
      showBlock('.dots_wrap',true,target)
      prevSelectItem = target
    }
   
    target.className.includes('dots_wrap') && onClickDots(target.offsetParent)

    target.className === 'menu_item' && onClickMenu(event,target)
  })
}

const onClickMenu = (event,currentSelectItem) => {
  const filmId = event.path.find(item => item.className === 'item_wrap').getAttribute('id')

  switch (currentSelectItem.textContent) {
    case 'delete': {
      if(!confirm('Delete this movie')) return 
      api(METHODS.delete, API_CONFIGS.filmDetails(filmId))
      document.location.reload()
      break
    }
    case 'edit': {
      redirect(ROUTE_NAMES.editMovie,{id: filmId})
      break
    }
    case 'details': {
      redirect(ROUTE_NAMES.movieDetails,{id: filmId})
      break
    }
  }  
}

const onClickDots = (currentSelectItem) => {
  const menuWrap = currentSelectItem.querySelector('.menu_wrap')
  const result = menuWrap.className.includes('hide') ? true : false
  showBlock(menuWrap,result,currentSelectItem)
}

const showBlock = (nameBlock, action, parent)  => {
  const element = typeof(nameBlock) === 'object' ? nameBlock :  parent.querySelector(nameBlock)
  const method = action ? 'remove' : 'add'
  element.classList[method]('hide')
}

const buildList = (arrFilms) => {
  arrFilms.forEach((film) => {
    const menu = {
      tag: 'div',
      class: 'menu_wrap hide',
      child: [
        {
          tag: 'div',
          class: 'menu_item',
          child: [
            {
              tag: 'img',
              class: 'icon',
              src: '../../assets/images/delete.png'
            },
            {
              tag: 'div',
              class: 'menu_value',
              content: 'delete'
            }
          ]
        },
        {
          tag: 'div',
          class: 'menu_item',
          child: [
            {
              tag: 'img',
              class: 'icon',
              src:'../../assets/images/pngwing.com.png'
            },
            {
              tag: 'div',
              class: 'menu_value',
              content: 'edit'
            }
          ]
        },
        {
          tag: 'div',
          class: 'menu_item',
          child: [
            {
              tag: 'img',
              class: 'icon',
              src:'../../assets/images/information.png'
            },
            {
              tag: 'div',
              class: 'menu_value',
              content: 'details'
            }
          ] 
        }
      ]
    }
    const dots = {
      tag: 'div',
      class: 'dots_wrap hide',
      child: [
        {
          tag: 'img',
          class: 'dots',
          src: '../../assets/images/free-icon-menu-dots-vertical-3917250.png'
        }
      ]
    }
    const itemFilm = {
      tag: 'div',
      class: 'film_item',
      child: [
        {
          tag: 'img',
          class: 'film_img',
          src: film.poster
        },
        {
          tag: 'div',
          class: 'film_info',
          child:[
            {
              tag: 'div',
              class: 'film_name',
              content: film.title
            },
            {
              tag: 'div',
              class: 'date_wrapper',
              child:[
                {
                  tag: 'div',
                  class: 'film_text',
                  content: 'release date: '
                },
                {
                  tag: 'div',
                  class: 'film_date',
                  content: isValidDate(film.release_date)
                }
              ]
            },
          ]
        },
      ]
    }
    const itemWrap = templateCreator(
      {
        tag: 'div',
        class: 'item_wrap',
         attribute: {id: film.id},
          child:[dots,menu,itemFilm]
        }
    )
    containerEl.append(itemWrap)
  })
  containerElDoubleClickHandler()
  containerElClickHandler()
}