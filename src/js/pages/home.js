import routes from '../routes.js'
import { api } from '../utils.js'
import { elementCreater } from '../utils.js'

const viewDetailsBtn = document.getElementById('view-details-btn')
const createMovieBtn = document.getElementById('create-movie-btn')
const editMovieBtn = document.getElementById('edit-movie-btn')
  
viewDetailsBtn.addEventListener('click', () => {
  window.location.href = routes.movieDetails({ name: 'lol', age: '32', status: 'accept' })
})
  
createMovieBtn.addEventListener('click', () => {
  window.location.href = routes.createMovie
})
  
editMovieBtn.addEventListener('click', () => {
  window.location.href = routes.editMovie({ id: '123' })
})


console.log('da');

function createFilmCatalog() {
  api('GET','/movies')
  .then(arrMovie => {
    displayList(arrMovie,blockLits,rows,currentPage)
    createPagination(arrMovie,pagination_element,rows)
  })  
}

const container = document.querySelector('.container')
const blockLits = elementCreater({block: 'div',class: 'catalog'})
const pagination_element = document.querySelector('.pagination')

let currentPage = 1
let rows = 20

function displayList (arrOfFilms, wrapper, rows_per_page, page) {
	wrapper.innerHTML = ""
  page--
  let start = rows_per_page * page
  let end = start + rows_per_page
	let moviePageList = arrOfFilms.slice(start, end)
	moviePageList.forEach((film) => {
    const movieName = elementCreater({block: 'div',class: 'movie_name',content: film.title})
    const blockInfo = elementCreater({block: 'div',class: 'movie_info',child:[movieName]})
    
    const img = elementCreater({block: 'img',class: 'movie_img',src: film.poster})
    const blockImg = elementCreater({block: 'div',class: 'block_img',child: [img]})
    
    const movieItem = elementCreater({block: 'div',class: 'movie_item',child: [blockImg,blockInfo]})
		wrapper.append(movieItem)
    container.append(wrapper)
	})
}


function createPagination (items, wrapper, rows_per_page) {
	wrapper.innerHTML = ""

	let page_count = Math.ceil(items.length / rows_per_page)
  let newArr = []

	for (let i = 1; i < page_count + 1; i++) {
		let btn = createPaginationButton(i, items)
		newArr.push(btn)
	}

  switch(currentPage) {
		case 1: {
			wrapper.append(newArr[currentPage - 1],newArr[currentPage],newArr[currentPage + 1],newArr[currentPage + 2],newArr[page_count - 1])
			break
		}
		case 2: {
			wrapper.append(newArr[0],newArr[currentPage - 1], newArr[currentPage],newArr[currentPage + 1],newArr[page_count - 1])
			break
		}
		case page_count: {
			wrapper.append(newArr[0],newArr[currentPage - 4],newArr[currentPage - 3],newArr[currentPage - 2],newArr[currentPage - 1])
			break
		}
		case page_count - 1 : {
			wrapper.append(newArr[0], newArr[currentPage - 3], newArr[currentPage - 2], newArr[currentPage - 1] ,newArr[currentPage],newArr[page_count - 1])
			break
		}
		default :{
			wrapper.append(newArr[0], newArr[currentPage - 2], newArr[currentPage - 1] ,newArr[currentPage],newArr[page_count - 1])
		}
	}

}

function createPaginationButton (page, items) {

	let button = elementCreater({block: 'button',content: page})

  currentPage == page && button.classList.add('active')

	button.addEventListener('click', () => {
    if(currentPage == page) return
		currentPage = page
    window.scrollTo(0,0)
		displayList(items, blockLits, rows, currentPage)
    createPagination(items,pagination_element, rows)
		button.classList.add('active')
	})

	return button

}
createFilmCatalog()