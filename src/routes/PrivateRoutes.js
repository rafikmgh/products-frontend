import React from 'react'
import { connect } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import CenteredPage from '../components/reusable/CenteredPage'
import Spinner from '../components/reusable/Spinner'

const PrivateRoutes = ({
  auth: { isAuthenticated, loading, currentUser, token },
}) => {
  return token == null ? (
    <Navigate to='/' />
  ) : loading ? (
    <CenteredPage>
      <Spinner />
    </CenteredPage>
  ) : currentUser == null ? (
    <CenteredPage>
      <Spinner />
    </CenteredPage>
  ) : isAuthenticated && !loading ? (
    <Outlet />
  ) : (
    <Navigate to='/' />
  )
}

const mapStateToProps = (state) => ({
  auth: state.authentification,
})

export default connect(mapStateToProps, {})(PrivateRoutes)
