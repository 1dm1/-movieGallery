import { isValidDate } from '../../utils/index.js'

export const MENU = {
  tag: 'div',
  class: 'menu_wrap hide',
  child: [
    {
      tag: 'div',
      class: 'menu_item',
      child: [
        {
          tag: 'img',
          class: 'icon',
          src: '../../assets/images/delete.png'
        },
        {
          tag: 'div',
          class: 'menu_value',
          content: 'delete'
        }
      ]
    },
    {
      tag: 'div',
      class: 'menu_item',
      child: [
        {
          tag: 'img',
          class: 'icon',
          src:'../../assets/images/pngwing.com.png'
        },
        {
          tag: 'div',
          class: 'menu_value',
          content: 'edit'
        }
      ]
    },
    {
      tag: 'div',
      class: 'menu_item',
      child: [
        {
          tag: 'img',
          class: 'icon',
          src:'../../assets/images/information.png'
        },
        {
          tag: 'div',
          class: 'menu_value',
          content: 'details'
        }
      ]
    }
  ]
}

export const DOTS = {
  tag: 'div',
  class: 'dots_wrap hide',
  child: [
    {
      tag: 'img',
      class: 'dots',
      src: '../../assets/images/free-icon-menu-dots-vertical-3917250.png'
    }
  ]
}

export const ITEM_FILMS = (film) => ({
  tag: 'div',
  class: 'film_item',
  child: [
    {
      tag: 'img',
      class: 'film_img',
      src: film.poster
    },
    {
      tag: 'div',
      class: 'film_info',
      child:[
        {
          tag: 'div',
          class: 'film_name',
          content: film.title
        },
        {
          tag: 'div',
          class: 'date_wrapper',
          child:[
            {
              tag: 'div',
              class: 'film_text',
              content: 'release date: '
            },
            {
              tag: 'div',
              class: 'film_date',
              content: isValidDate(film.release_date)
            }
          ]
        },
      ]
    },
  ]
})