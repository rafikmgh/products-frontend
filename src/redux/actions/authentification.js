import axios from 'axios'
import {
  REGISTER_USER,
  LOGOUT,
  REGISTER_FAIL,
  LOADING,
  LOGIN_USER,
  LOGIN_FAIL,
  LOAD_USER,
} from './types'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

//register user action
export const registerUser = (formData) => async (dispatch) => {
  const config = {
    header: { 'content-type': 'application/json' },
  }

  try {
    //loading...
    dispatch({
      type: LOADING,
    })
    //get the data from the form
    const res = await axiosInstance.post('/users/register', formData, config)
    dispatch({
      type: REGISTER_USER,
      payload: res.data,
    })
    //load the registered user
    dispatch(loadUser())
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    })
  }
}

//login user action
export const loginUser = (formData) => async (dispatch) => {
  const config = {
    header: { 'content-type': 'application/json' },
  }
  //loading...
  try {
    dispatch({
      type: LOADING,
    })
    //getting data from the form
    const res = await axiosInstance.post('/users/login', formData, config)
    //login
    dispatch({
      type: LOGIN_USER,
      payload: res.data,
    })
    //load the user
    dispatch(loadUser())
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    })
  }
}
//loading the user
export const loadUser = () => async (dispatch) => {
  axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
  })
  const isToken = localStorage.getItem('token')
  if (isToken) {
    //loading ...
    try {
      dispatch({
        type: LOADING,
      })
      //get the current user
      const res = await axiosInstance.get('/users/me')

      dispatch({
        type: LOAD_USER,
        payload: res.data,
      })
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.message,
      })
    }
  }
}

//loggin out action
export const logoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  })
}
