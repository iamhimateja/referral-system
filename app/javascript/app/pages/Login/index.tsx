import { Alert, Box, Button, Collapse, Container, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Heading, LinkStyled, Logo, SubHeading, buttonStyles, inputStyles } from '../../components/styles'
import { api, redirectToHome, validateEmail } from '../../helpers'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setTouched(true)
    if (email && password && validateEmail(email)) {
      await api
        .login({
          email,
          password,
        })
        .then((response) => {
          if (response.status === 401) {
            setShowErrorAlert(true)
          } else {
            const data = response.data
            if (data.token) {
              localStorage.setItem('authToken', data.token)
              redirectToHome()
            }
          }
        })
    }
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (showErrorAlert) {
      timeout = setTimeout(() => {
        setShowErrorAlert(false)
      }, 6000)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [showErrorAlert])

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        minHeight: '100vh',
        placeItems: 'center',
      }}
    >
      <Grid container direction="column">
        <Grid item xs>
          <Grid alignContent="center" alignItems="center" container direction="column">
            <Grid item>
              <Logo src="/logo.png" alt="Referral app logo" />
            </Grid>
            <Grid item>
              <Heading>Login</Heading>
            </Grid>
            <Grid item>
              <SubHeading>to access to your referrals</SubHeading>
            </Grid>
          </Grid>
        </Grid>
        <Collapse in={showErrorAlert}>
          <Grid item xs mt={2}>
            <Alert variant="filled" severity="error" onClose={() => setShowErrorAlert(false)}>
              Invalid email or password
            </Alert>
          </Grid>
        </Collapse>
        <Grid item xs>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} autoComplete="off">
            <TextField
              type="email"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email address"
              name="email"
              autoComplete="email"
              variant="filled"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
              error={touched && (!email || !validateEmail(email))}
              helperText={
                (touched && !email && 'Email is required') ||
                (touched && !validateEmail(email) && 'Please enter a valid email')
              }
              sx={inputStyles}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="filled"
              placeholder="Please enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched(true)}
              error={touched && !password}
              helperText={touched && !password && 'Password is required'}
              sx={inputStyles}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={buttonStyles}
              disabled={touched && (!email || !password || !validateEmail(email))}
            >
              Login
            </Button>

            <Grid item>
              Haven&apos;t registered yet?&nbsp;
              <LinkStyled to="/register">Create an account</LinkStyled>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
