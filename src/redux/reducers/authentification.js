import {
  REGISTER_USER,
  LOGIN_USER,
  LOAD_USER,
  LOADING,
  LOGOUT,
  LOGIN_FAIL,
  REGISTER_FAIL,
} from '../actions/types'

//setting initial values
const initialState = {
  currentUser: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  error: '',
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    //case of register and login we take what in the initial state and change the token and isAuthenticated
    case REGISTER_USER:
    case LOGIN_USER:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        token: payload.token,
        loading: false,
        isAuthenticated: true,
      }
    //in loading a user action we take the payload + setting auth to true
    case LOAD_USER:
      return {
        ...state,
        currentUser: payload,
        loading: false,
        isAuthenticated: true,
      }
    //failing cases or logout we remove the token setting the others to initial state + payload error
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        currentUser: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: payload,
      }
    //if non of the actions we just return the state
    default:
      return state
  }
}
