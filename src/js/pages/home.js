import { redirect } from '../routes.js'
import { api } from '../utils.js'
import { elementCreater } from '../utils.js'
import { parseDate } from '../utils.js'

const containerEl = document.querySelector('.film_catalog')

api('GET','/movies?_limit=10')
.then(arrFilms => {
  displayList(arrFilms)
})

const displayList = (arrFilms) => {
  buildList(arrFilms)
  doubleClickHandler()
}

const buildList = (arrFilms) => {
  arrFilms.forEach((film) => {
    const filmName = elementCreater({tag: 'div',class: 'film_name',content: film.title})
    const filmDate = elementCreater({tag: 'div',class: 'film_date',content: parseDate(film.release_date)})
    const filmText = elementCreater({tag: 'div',class: 'film_text',content: 'release date: '})
    const movieDateWrapper = elementCreater({tag: 'div',class: 'date_wrapper',child:[filmText,filmDate]})
    const wrapperInfoFilm = elementCreater({tag: 'div',class: 'film_info',child:[filmName,movieDateWrapper]})
    const filmImg = elementCreater({tag: 'img',class: 'film_img',src: film.poster})
    const filmItem = elementCreater({tag: 'div',class: 'film_item', attribute: [{data: film.id}], child: [filmImg,wrapperInfoFilm]})
    containerEl.append(filmItem)
  })
}

const doubleClickHandler = () => {
  containerEl.addEventListener('dblclick',(e) => {
    document.querySelectorAll('.film_item').forEach(item => {
      item.contains(e.target) ? redirect('movieDetails',{data: item.getAttribute('data')}) : ''
    })
  })
}

console.log('test')









