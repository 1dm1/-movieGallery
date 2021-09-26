import routes from '../routes.js'

const viewDetailsBtn = document.getElementById('view-details-btn')
const createMovieBtn = document.getElementById('create-movie-btn')
const editMovieBtn = document.getElementById('edit-movie-btn')
const testBtn = document.getElementById('test-btn')

viewDetailsBtn.addEventListener('click', () => {
  window.location.href = routes.movieDetails({ name: 'lol', age: '32', status: 'accept' })
})

createMovieBtn.addEventListener('click', () => {
  window.location.href = routes.createMovie
})

editMovieBtn.addEventListener('click', () => {
  window.location.href = routes.editMovie({ id: '123' })
})

testBtn.addEventListener('click', () => {
  window.location.href = routes.testPage
})
