import routes from '../routes.js'
import { getURLParams } from '../utils.js'

const goHomeBtn = document.getElementById('go-home-btn')

const params = getURLParams()
console.log('params', params)

goHomeBtn.addEventListener('click', () => {
  window.location.href = routes.home
})
