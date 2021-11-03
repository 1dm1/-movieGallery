import { redirect,ROUTE_NAMES } from '../../routes.js'
import { getURLParams,templateCreator } from '../../utils.js'
import { api,METHODS,API_CONFIGS} from '../../api.js'
import { POSTER ,TITLE, DATE, GENRE, OVERVIEW ,REFACT} from './templates.js'

const goHomeBtn = document.querySelector('.go_home_btn')
const filmBlockEl = document.querySelector('.wrapper_film')
const params = getURLParams()

goHomeBtn.addEventListener('click', () => redirect(ROUTE_NAMES.home))

api(METHODS.get, API_CONFIGS.filmDetails(params.id)).then(film => {
  createPostDetails(film)
})

const createPostDetails = (film) => {
  REFACT.addEventListener('click',() => {
    redirect(ROUTE_NAMES.editMovie,{id: film.id})
  })

  const blockInfo = {
  tag: 'div',
  class: 'info_block',
  child:[REFACT,TITLE(film),DATE(film),GENRE(film)]
  }
  
  const wrapper = templateCreator({
    tag: 'div',
    class: 'film_block',
    child: [POSTER(film),blockInfo]
  })

  filmBlockEl.append(wrapper,OVERVIEW(film))
}