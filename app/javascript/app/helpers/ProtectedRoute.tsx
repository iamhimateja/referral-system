import React from 'react'
import { Navigate } from 'react-router-dom'

type ProtectedRouteProps = {
  isLoggedIn: any
  redirectPath?: string
  children: React.ReactNode | React.ReactElement
}

export const ProtectedRoute = ({ isLoggedIn, redirectPath = '/', children }: ProtectedRouteProps) => {
  if (!isLoggedIn) {
    return (<Navigate to={redirectPath} replace />) as any
  }

  return children
}
