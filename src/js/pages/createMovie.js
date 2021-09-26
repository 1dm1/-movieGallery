import routes from '../routes.js'

const goHomeBtn = document.getElementById('go-home-btn')

goHomeBtn.addEventListener('click', () => {
  window.location.href = routes.home
})
