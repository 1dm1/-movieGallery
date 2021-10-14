import { redirect,ROUTE_NAMES } from '../routes.js'
import { getURLParams,isValidDate,elementCreator } from '../utils.js'
import { api,METHODS,API_CONFIGS} from '../api.js'

const goHomeBtn = document.querySelector('.go_home_btn')
const filmBlockEl = document.querySelector('.wrapper_film')
const params = getURLParams()

goHomeBtn.addEventListener('click', () => redirect(ROUTE_NAMES.home))

api(METHODS.get, API_CONFIGS.filmDetails(params.id)).then(film => {
  createPostDetails(film)
})

const createPostDetails = (film) => {
  const poster = elementCreator({tag: 'img',class: 'poster',src: film.poster})
  const posterWrap = elementCreator({tag: 'div',class: 'poster_wrapper',child: [poster]})
  const title = elementCreator({tag: 'div',class: 'title',content: 'title:' })
  const titleValue = elementCreator({tag: 'div',content: film.title})
  const titleWrap = elementCreator({tag: 'div',class: 'wrapper_table',child:[title,titleValue]})
  const date = elementCreator({tag: 'div',class: 'title',content: 'realese date' })
  const dateValue = elementCreator({tag: 'div',content: isValidDate(film.release_date)})
  const dateWrap = elementCreator({tag: 'div',class: 'wrapper_table',child:[date,dateValue]})
  const genreTitle = elementCreator({tag: 'div',class: 'title',content: 'ganre:' })
  const genresValue = elementCreator({tag: 'div',class: 'wrapper_ganre',child: genresBuild(film)})
  const genreWrap = elementCreator({tag: 'div',class: 'wrapper_table',child:[genreTitle,genresValue]})
  const overviewWrap = elementCreator({tag: 'div',class: 'wrapper_overview',content: film.overview})
  const refactIcon = elementCreator({tag: 'img',class: 'edit_icon',src: '../../assets/images/pngwing.com.png'})
  const blockInfo = elementCreator({tag: 'div',class: 'info_block',child:[refactIcon,titleWrap,dateWrap,genreWrap]})
  const wrapper = elementCreator({tag: 'div',class: 'film_block',child: [posterWrap,blockInfo]})
  filmBlockEl.append(wrapper,overviewWrap)
}

const genresBuild = (film) => {
  return film.genres.map((genre) => elementCreator({tag: 'div',class: 'genre',content: genre}))
}



