import axios from 'axios'

import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_PRODUCTS,
  LOADING,
  PRODUCT_ERROR,
  SELECT_CURRENT_PRODUCT,
  UPDATE_PRODUCT,
} from './types'

//using axios to interact with our apis
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

//get all products action
export const getAllProducts = () => async (dispatch) => {
  //setting in headers the Authorization to the 'Bearer token'
  axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
  })

  try {
    //loading
    dispatch({
      type: LOADING,
    })
    //getting all products
    const res = await axiosInstance.get(`/products/getAll`)
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: res.data.products,
    })
  } catch (error) {
    console.log(error)
  }
}

//creating a product action
export const createProduct = (formData) => async (dispatch) => {
  //always setting authorization to 'Bearer token' before taken actions
  axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
  })
  //configuration the header content type to json application
  const config = {
    header: { 'content-type': 'application/json' },
  }

  //if the token exist
  const isToken = localStorage.getItem('token')

  if (isToken) {
    try {
      const res = await axiosInstance.post('/products/create', formData, config)

      dispatch({
        type: CREATE_PRODUCT,
        payload: res.data.product,
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_ERROR,
        payload: error.response.data.message,
      })
    }
  }
}

//updating a product action
export const updateProduct = (formData, productID) => async (dispatch) => {
  axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
  })

  const config = {
    header: { 'content-type': 'application/json' },
  }

  const isToken = localStorage.getItem('token')

  if (isToken) {
    try {
      const res = await axiosInstance.post(
        `/products/update/${productID}`,
        formData,
        config
      )

      dispatch({
        type: UPDATE_PRODUCT,
        payload: res.data.product,
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_ERROR,
        payload: error.response.data.message,
      })
    }
  }
}

//delete product action
export const deleteProduct = (productID) => async (dispatch) => {
  axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
  })

  const config = {
    header: { 'content-type': 'application/json' },
  }

  const isToken = localStorage.getItem('token')

  if (isToken) {
    try {
      const res = await axiosInstance.delete(
        `/products/delete/${productID}`,
        {},
        config
      )

      dispatch({
        type: DELETE_PRODUCT,
        payload: productID,
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_ERROR,
        payload: error.response.data.message,
      })
    }
  }
}

//select curent product
export const selectCurrentProduct = (product) => async (dispatch) => {
  dispatch({
    type: SELECT_CURRENT_PRODUCT,
    payload: product,
  })
}
