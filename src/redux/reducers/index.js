import { combineReducers } from 'redux'
import authentification from './authentification'
import products from './products'

//combining the reducers in an object and exporting it
export default combineReducers({
  authentification,
  products,
})
