//importing the action types from types.js
import {
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
  LOADING,
  PRODUCT_ERROR,
  SELECT_CURRENT_PRODUCT,
} from '../actions/types'

//the initial state of products
const initialState = {
  currentProduct: null,
  products: [],
  loading: false,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    //setting loading to true
    case LOADING:
      return {
        ...state,
        loading: true,
      }
    //we just save our products and adding the payload (new product) to the collection
    case CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, payload],
        loading: false,
      }
    //we map through our products if its the payload._id = (one of our product ids) we just change that product to the new one else we let it
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((myProduct) =>
          myProduct._id == payload._id ? payload : myProduct
        ),
        loading: false,
      }
    // in case action of delete product we filter all our products except the deleted one
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (myProduct) => myProduct._id != payload
        ),
        loading: false,
      }
    //we just get all the products
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false,
      }

    // set the curent product to payload
    case GET_PRODUCT:
      return {
        ...state,
        currentProduct: payload,
        loading: false,
      }
    //if an error we just set it to initial
    case PRODUCT_ERROR:
      return {
        ...state,
        currentProduct: null,
        products: [],
        loading: false,
      }
    case SELECT_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: payload,
        loading: false,
      }
    default:
      return state
  }
}
