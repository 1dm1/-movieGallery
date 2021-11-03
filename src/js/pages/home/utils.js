import { BLOCK_VISIBLE_ACTIONS, HIDE_CLASS_NAME } from './constants.js'

export const elementVisible = ({ element, className, show, parent })  => {
  if (!element && !parent) return
  const elem = element || (className && parent.querySelector(className)) || null
  const method = show ? BLOCK_VISIBLE_ACTIONS.remove : BLOCK_VISIBLE_ACTIONS.add
  elem.classList[method](HIDE_CLASS_NAME)
}
