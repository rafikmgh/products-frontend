import './App.css'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/main/Auth/Login'
import Register from './components/main/Auth/Register'
import Header from './components/main/Header/Header'
import AllProducts from './components/products/ProductManage/AllProducts'
import PrivateRoutes from './routes/PrivateRoutes'
import { loadUser } from './redux/actions/authentification'
import { useEffect } from 'react'
import Product from './components/products/ProductManage/Product'

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Header />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/products' element={<PrivateRoutes />}>
              <Route path='' element={<AllProducts />} />
              <Route path='/products/:productID' element={<Product />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App
