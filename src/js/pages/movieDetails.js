import { redirect,ROUTE_NAMES } from '../routes.js'
import { getURLParams,isValidDate,templateCreator } from '../utils.js'
import { api,METHODS,API_CONFIGS} from '../api.js'

const goHomeBtn = document.querySelector('.go_home_btn')
const filmBlockEl = document.querySelector('.wrapper_film')
const params = getURLParams()

goHomeBtn.addEventListener('click', () => redirect(ROUTE_NAMES.home))

api(METHODS.get, API_CONFIGS.filmDetails(params.id)).then(film => {
  createPostDetails(film)
})

const createPostDetails = (film) => {
  const poster = {
    tag: 'div',
    class: 'poster_wrapper',
    child: [
      {
        tag: 'img',
        class: 'poster',
        src: film.poster
      }
    ]
  }

  const title = {
    tag: 'div',
    class: 'wrapper_table',
    child:[
      {
        tag: 'div',
        class: 'title',
        content: 'title:'
      },
      {
        tag: 'div',
        content: film.title
      }
    ]
  }

  const date = {
    tag: 'div',
    class: 'wrapper_table',
    child:[
      {
        tag: 'div',
        class: 'title',
        content: 'realese date'
      },
      {
        tag: 'div',
        content: isValidDate(film.release_date)
      }
    ]
  }

  const genre = {
    tag: 'div',
    class: 'wrapper_table',
    child:[
      {
        tag: 'div',
        class: 'title',
        content: 'ganre:'
      }, 
      {
        tag: 'div',
        class: 'wrapper_ganre',
        child: genresBuild(film)
      }
    ]
  }

  const overview = templateCreator({
    tag: 'div',
    class: 'overview_Wrap',
    child: [
      {
        tag: 'div',
        class: 'overview_Value',
        content: film.overview
      }
    ]
  })

  const refact = {
    tag: 'img',
    class: 'edit_icon',
    src: '../../assets/images/pngwing.com.png'
  }

  const blockInfo = {
    tag: 'div',
    class: 'info_block',
    child:[refact,title,date,genre]
  }
  
  const wrapper = templateCreator({
    tag: 'div',
    class: 'film_block',
    child: [poster,blockInfo]
  })

  filmBlockEl.append(wrapper,overview)
  onEditClick(film)
}

const onEditClick = film => {
  filmBlockEl.addEventListener('click',({ target }) => {
    target.className == 'edit_icon' && redirect(ROUTE_NAMES.editMovie,{id: film.id})
  })
}

const genresBuild = (film) => {
  return film.genres.map((genre) => ({tag: 'div',class: 'genre',content: genre}))
}