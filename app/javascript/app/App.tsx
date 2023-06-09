import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { ProtectedRoute, theme } from './helpers'
import Loading from './components/Loading'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        bgcolor="#f5f5f5"
        width="100vw"
        height="100vh"
        sx={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          overflowY: 'auto',
        }}
      >
        <Suspense fallback={<Loading />}>
          <BrowserRouter>
            <Routes>
              <Route
                index
                element={
                  <ProtectedRoute isLoggedIn={!!localStorage.getItem('authToken')} redirectPath="/login">
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </Box>
    </ThemeProvider>
  )
}

export default App
