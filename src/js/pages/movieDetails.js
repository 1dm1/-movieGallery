import routes from '../routes.js'
import { getURLParams } from '../utils.js'
import { api } from '../utils.js'
import { elementCreater } from '../utils.js'

const goHomeBtn = document.querySelector('.go_home_btn')
const filmBlockEl = document.querySelector('.wrapper_film')
const params = getURLParams()

goHomeBtn.addEventListener('click', () => window.location.href = routes.home)

api('GET',`/movies/${params.data}`)
.then(film => {
  createShortPost(film)
})

const createShortPost = (film) => {
  const poster = elementCreater({block: 'img',class: 'poster',src: film.poster})
  const posterWrapper = elementCreater({block: 'div',class: 'poster_wrapper',child: [poster]})
  const title = elementCreater({block: 'div',class: 'title',content: 'Название:' })
  const titleDescr = elementCreater({block: 'div',content: film.title})
  const titleWrapper = elementCreater({block: 'div',class: 'wrapper_table',child:[title,titleDescr]})
  const date = elementCreater({block: 'div',class: 'title',content: 'Год выпуска:' })
  const dateDesrc = elementCreater({block: 'div',content: new Date(film.release_date).toLocaleDateString()})
  const dateWrapper = elementCreater({block: 'div',class: 'wrapper_table',child:[date,dateDesrc]})
  const genreTitle = elementCreater({block: 'div',class: 'title',content: 'Жанры:' })
  const arrBlockGenre = []
  film.genres.forEach(item => {
    const genre = elementCreater({block: 'div',class: 'genre',content: item})
    arrBlockGenre.push(genre)
  })
  const genresDesrc = elementCreater({block: 'div',class: 'wrapper_ganre',child: arrBlockGenre})
  const genreWrapper = elementCreater({block: 'div',class: 'wrapper_table',child:[genreTitle,genresDesrc]})
  const wrapperOverview = elementCreater({block: 'div',class: 'wrapper_overview',content: film.overview})
  const refactIcon = elementCreater({block: 'img',class: 'edit_icon',src: '../../assets/images/pngwing.com.png'})
  const blockInfo = elementCreater({block: 'div',class: 'info_block',child:[refactIcon,titleWrapper,dateWrapper,genreWrapper]})
  const wrapper = elementCreater({block: 'div',class: 'film_block',child: [posterWrapper,blockInfo]})
  filmBlockEl.append(wrapper,wrapperOverview)
}








