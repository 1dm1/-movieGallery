
import { isValidDate, templateCreator } from '../../utils/index.js'

export const POSTER = (film) => ({
    tag: 'div',
    class: 'poster_wrapper',
    child: [
        {
        tag: 'img',
        class: 'poster',
        src: film.poster
        }
    ]
})

export const TITLE = (film) => ({
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
})

export const DATE = (film) =>  ({
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
})

export const GENRE = (film) => ({
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
})

export const OVERVIEW = (film) => (
    templateCreator({
        tag: 'div',
        class: 'overview_Wrap',
        child: [
            {
            tag: 'div',
            class: 'overview_Value',
            content: film.overview
            }
        ]
    }
)) 

export const REFACT = templateCreator({
    tag: 'img',
    class: 'edit_icon',
    src: '../../assets/images/pngwing.com.png'
})

const genresBuild = (film) => {
    return film.genres.map((genre) => ({tag: 'div',class: 'genre',content: genre}))
}