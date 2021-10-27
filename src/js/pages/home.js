import { redirect,ROUTE_NAMES } from '../routes.js'
import { isValidDate,elementCreator } from '../utils.js'
import { api, METHODS,API_CONFIGS } from '../api.js'

const containerEl = document.querySelector('.film_catalog')

api(METHODS.get, API_CONFIGS.movies({ _limit: 10 })).then(arrFilms => {
  displayList(arrFilms)
})

const displayList = (arrFilms) => {
  buildList(arrFilms)
  сlickHandler()
}

const buildList = (arrFilms) => {
  arrFilms.forEach((film) => {
    const deleteIcon = elementCreator({tag: 'img',class: 'icon',src:'../../assets/images/delete.png'})
    const deleteValue = elementCreator({tag: 'div',class: 'value',content: 'delete'})
    const deleteWrap = elementCreator({tag: 'div',class: 'menu_item',child: [deleteIcon,deleteValue]})
    const editIcon = elementCreator({tag: 'img',class: 'icon',src:'../../assets/images/pngwing.com.png'})
    const editValue = elementCreator({tag: 'div',class: 'value',content: 'edit'})
    const editWrap = elementCreator({tag: 'div',class: 'menu_item',child: [editIcon,editValue]})
    const detailsIcon = elementCreator({tag: 'img',class: 'icon',src:'../../assets/images/information.png'})
    const detailsValue = elementCreator({tag: 'div',class: 'value',content: 'details'})
    const detailsWrap = elementCreator({tag: 'div',class: 'menu_item',child: [detailsIcon,detailsValue]})
    const menuWrap = elementCreator({tag: 'div',class: 'menu_wrap',child:[deleteWrap,editWrap,detailsWrap]})
    const dots = elementCreator({tag: 'img',class: 'dots',src: '../../assets/images/free-icon-menu-dots-vertical-3917250.png'})
    const dotsWrap = elementCreator({tag: 'div',class: 'dots_wrap',child:[dots]})
    const filmName = elementCreator({tag: 'div',class: 'film_name',content: film.title})
    const filmDate = elementCreator({tag: 'div',class: 'film_date',content: isValidDate(film.release_date)})
    const filmText = elementCreator({tag: 'div',class: 'film_text',content: 'release date: '})
    const movieDateWrapper = elementCreator({tag: 'div',class: 'date_wrapper',child:[filmText,filmDate]})
    const wrapperInfoFilm = elementCreator({tag: 'div',class: 'film_info',child:[filmName,movieDateWrapper]})
    const filmImg = elementCreator({tag: 'img',class: 'film_img',src: film.poster})
    const filmItem = elementCreator({tag: 'div',class: 'film_item', child: [filmImg,wrapperInfoFilm]})
    const itemWrap = elementCreator({tag: 'div',class: 'item_wrap',attribute: {id: film.id},child:[dotsWrap,menuWrap,filmItem]})
    containerEl.append(itemWrap)
  })
}

const сlickHandler = () => {
  window.addEventListener('dblclick',(e) => {
    containerEl.querySelectorAll('.item_wrap').forEach(filmItem => {
      filmItem.contains(e.target) ? redirect(ROUTE_NAMES.movieDetails,{id: filmItem.getAttribute('id')}) : ''
    })
  })

  let lastItem
  
  window.addEventListener('click',(e) => {
    let currentItem
    
    containerEl.querySelectorAll('.item_wrap').forEach(filmItem => {
      filmItem.contains(e.target) ? currentItem = filmItem : ''
    })

    if(lastItem == currentItem && lastItem !== undefined && lastItem.className == 'item_wrap active' && e.target.className !== 'dots' && e.target.className !== 'value'){
      hideElement()
      return
    }
    
    if(e.target.className !== 'dots' && lastItem !== undefined) {
      lastItem.getAttribute('show') && lastItem.removeAttribute('show')
    }

    if(lastItem !== undefined) hideElement()
    
    if(currentItem !== undefined) {
      lastItem = currentItem
      currentItem.classList.add('active')
      showBlock('.dots_wrap',true,currentItem)
    }

    if(e.target.className == 'dots') {
      if(currentItem.getAttribute('show')) {
        showBlock('.menu_wrap',false,currentItem)
        currentItem.removeAttribute('show')
      }else {
        showBlock('.menu_wrap',true,currentItem) 
        currentItem.setAttribute('show','on')
      }
    }

    if(e.target.className == 'value') {
      hideElement()

      const filmId = currentItem.getAttribute('id')

      switch (e.target.textContent) {
        case 'delete': {
          if(!confirm('Are you sure you want to delete this movie')) return 
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
    
  })

  const hideElement = () => {
    lastItem.classList.remove('active')
    showBlock('.dots_wrap',false,lastItem)
    showBlock('.menu_wrap',false,lastItem)
  }

  const showBlock = (nameBlock,action,parent)  => {
    const element = parent.querySelector(nameBlock)
    element.style.cssText = action ? ` opacity: 1; z-index: 1;` : ` opacity: 0; z-index: -1;`
  }
  
}





