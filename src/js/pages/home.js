import routes from '../routes.js'
import { api } from '../utils.js'
import { elementCreater } from '../utils.js'

const containerEl = document.querySelector('.film_catalog')

api('GET','/movies?_limit=10')
.then(arrFilms => {
  displayList(arrFilms)
})

const displayList = (arrFilms) => {
	arrFilms.forEach((film) => {
    const filmName = elementCreater({block: 'div',class: 'film_name',content: film.title})
    const filmDate = elementCreater({block: 'div',class: 'film_date',content: new Date(film.release_date).toLocaleDateString()})
    const filmText = elementCreater({block: 'div',class: 'film_text',content: 'Год выпуска:'})
    const movieDateWrapper = elementCreater({block: 'div',class: 'date_wrapper',child:[filmText,filmDate]})
    const wrapperInfoFilm = elementCreater({block: 'div',class: 'film_info',child:[filmName,movieDateWrapper]})
    const filmImg = elementCreater({block: 'img',class: 'film_img',src: film.poster})
    const filmItem = elementCreater({block: 'div',class: 'film_item', attribute: [{data: film.id}], child: [filmImg,wrapperInfoFilm]})
		containerEl.append(filmItem)
	})
  containerEl.addEventListener('dblclick',(e) => {
    document.querySelectorAll('.film_item').forEach(item => {
      item.contains(e.target) ?  window.location.href = routes.movieDetails({data: item.getAttribute('data') }) : ''
    })
  })
}




