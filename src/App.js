import Header from './components/main/Header/Header'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import store from './store'
import Register from './components/main/Auth/Register'
import Login from './components/main/Auth/Login'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Header />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/products'>
              <Route path='' />
              <Route path='/products/:productID' />
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App
