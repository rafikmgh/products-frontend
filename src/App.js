import Header from './components/main/Header/Header'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Header />
          <Routes>
            <Route path='/' />
            <Route path='/register' />
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
