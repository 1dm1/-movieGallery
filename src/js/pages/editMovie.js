import { redirect, ROUTE_NAMES } from '../routes.js'
import { getURLParams } from '../utils.js'

const goHomeBtn = document.querySelector('.go_home_btn')

const params = getURLParams()

goHomeBtn.addEventListener('click', () => {
  redirect(ROUTE_NAMES.home)
})
