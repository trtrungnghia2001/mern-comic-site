import React, { memo, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../stores/auth.store'

const AuthProtectedRouter = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()
  const { isLoggedIn, user, signout } = useAuthStore()

  useEffect(() => {
    if (!isLoggedIn || !user) {
      signout()
    }
  }, [isLoggedIn, user])

  if (!isLoggedIn) return <Navigate to={`/`} state={location} />

  return children
}

export default memo(AuthProtectedRouter)
