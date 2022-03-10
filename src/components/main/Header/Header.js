//some styling
import './Header.css'
//connect the header with redux
import { connect } from 'react-redux'
//importing links
import { Link } from 'react-router-dom'
//importing logout action from athentification
import { logoutUser } from '../../../redux/actions/authentification'

const Header = ({ auth, logoutUser }) => {
  return (
    <header className='app-header'>
      <nav>
        <ul className='header-links'>
          {!auth.isAuthenticated ? (
            <>
              <li>
                <Link to='/'>Connexion</Link>
              </li>
              <li>
                <Link to='/register'>Creer un compte</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/products'>Produits</Link>
              </li>
              <li className='logout-link' onClick={() => logoutUser()}>
                Se deconnecter
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

const mapStateToProps = (state) => ({
  auth: state.authentification,
})

export default connect(mapStateToProps, { logoutUser })(Header)
