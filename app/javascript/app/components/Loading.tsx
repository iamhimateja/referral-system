import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: 9999,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        placeContent: 'center',
        placeItems: 'center',
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(3px)',
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default Loading
