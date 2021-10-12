import { redirect } from '../routes.js'
import { getURLParams } from '../utils.js'
import { api } from '../utils.js'
import { elementCreater } from '../utils.js'
import { parseDate } from '../utils.js'

const goHomeBtn = document.querySelector('.go_home_btn')
const filmBlockEl = document.querySelector('.wrapper_film')
const params = getURLParams()

goHomeBtn.addEventListener('click', () => redirect('home'))

api('GET',`/movies/${params.data}`)
.then(film => {
  createShortPost(film)
})

const createShortPost = (film) => {
  const poster = elementCreater({tag: 'img',class: 'poster',src: film.poster})
  const posterWrapper = elementCreater({tag: 'div',class: 'poster_wrapper',child: [poster]})
  const title = elementCreater({tag: 'div',class: 'title',content: 'title:' })
  const titleDescr = elementCreater({tag: 'div',content: film.title})
  const titleWrapper = elementCreater({tag: 'div',class: 'wrapper_table',child:[title,titleDescr]})
  const date = elementCreater({tag: 'div',class: 'title',content: 'realese date' })
  const dateDesrc = elementCreater({tag: 'div',content: parseDate(film.release_date)})
  const dateWrapper = elementCreater({tag: 'div',class: 'wrapper_table',child:[date,dateDesrc]})
  const genreTitle = elementCreater({tag: 'div',class: 'title',content: 'ganre:' })
  const genresDesrc = elementCreater({tag: 'div',class: 'wrapper_ganre',child: genresBuild(film)})
  const genreWrapper = elementCreater({tag: 'div',class: 'wrapper_table',child:[genreTitle,genresDesrc]})
  const wrapperOverview = elementCreater({tag: 'div',class: 'wrapper_overview',content: film.overview})
  const refactIcon = elementCreater({tag: 'img',class: 'edit_icon',src: '../../assets/images/pngwing.com.png'})
  const blockInfo = elementCreater({tag: 'div',class: 'info_block',child:[refactIcon,titleWrapper,dateWrapper,genreWrapper]})
  const wrapper = elementCreater({tag: 'div',class: 'film_block',child: [posterWrapper,blockInfo]})
  filmBlockEl.append(wrapper,wrapperOverview)
}

const genresBuild = (film) => {
  const arrBlockGenre = []
  film.genres.forEach(genr => {
    const genre = elementCreater({tag: 'div',class: 'genre',content: genr})
    arrBlockGenre.push(genre)
  })
  return arrBlockGenre
}



