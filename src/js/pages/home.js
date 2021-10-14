import { redirect,ROUTE_NAMES } from '../routes.js'
import { isValidDate,elementCreator } from '../utils.js'
import { api, METHODS,API_CONFIGS } from '../api.js'

const containerEl = document.querySelector('.film_catalog')

api(METHODS.get, API_CONFIGS.movies({ _limit: 10 })).then(arrFilms => {
  displayList(arrFilms)
})

const displayList = (arrFilms) => {
  buildList(arrFilms)
  doubleClickHandler()
}

const buildList = (arrFilms) => {
  arrFilms.forEach((film) => {
    const filmName = elementCreator({tag: 'div',class: 'film_name',content: film.title})
    const filmDate = elementCreator({tag: 'div',class: 'film_date',content: isValidDate(film.release_date)})
    const filmText = elementCreator({tag: 'div',class: 'film_text',content: 'release date: '})
    const movieDateWrapper = elementCreator({tag: 'div',class: 'date_wrapper',child:[filmText,filmDate]})
    const wrapperInfoFilm = elementCreator({tag: 'div',class: 'film_info',child:[filmName,movieDateWrapper]})
    const filmImg = elementCreator({tag: 'img',class: 'film_img',src: film.poster})
    const filmItem = elementCreator({tag: 'div',class: 'film_item', attribute: {data: film.id}, child: [filmImg,wrapperInfoFilm]})
    containerEl.append(filmItem)
  })
}

const doubleClickHandler = () => {
  containerEl.addEventListener('dblclick',(e) => {
    document.querySelectorAll('.film_item').forEach(item => {
      item.contains(e.target) ? redirect(ROUTE_NAMES.movieDetails,{id: item.getAttribute('data')}) : ''
    })
  })
}












