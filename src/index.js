import './style.css'
import { renderSideBar, displayTodos}from './components/DOMController'
import { initLocalStorage} from './components/data'
import initButtons from './components/button'

initButtons()
initLocalStorage()
renderSideBar()
displayTodos()