import { Alert, Box, Button, Collapse, Container, Grid, TextField } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { Heading, LinkStyled, Logo, SubHeading, buttonStyles, inputStyles } from '../../components/styles'
import { api, redirectToHome, validateEmail } from '../../helpers'
import { useLocation } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [touched, setTouched] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get('token')

  const isFormDisabled = useMemo(() => {
    return !name || !email || !password || !validateEmail(email) || password !== confirmPassword || password.length < 8
  }, [name, email, password, confirmPassword])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!isFormDisabled) {
      await api.register(name, email, password, token ?? undefined).then((response) => {
        if (response.status === 422) {
          setShowErrorAlert(true)
          setErrorMessage(response.data.error)
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
    const fetchReferralData = async () => {
      if (token) {
        const response = await api.fetchReferral(token)
        if (response.email) {
          setEmail(response.email)
        }
      }
    }

    fetchReferralData()
  }, [token])

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
              <Heading>Register</Heading>
            </Grid>
            <Grid item>
              <SubHeading>Your referrals are just one step away.</SubHeading>
            </Grid>
          </Grid>
        </Grid>
        <Collapse in={showErrorAlert}>
          <Grid item xs mt={2}>
            <Alert variant="filled" severity="error" onClose={() => setShowErrorAlert(false)}>
              {errorMessage}
            </Alert>
          </Grid>
        </Collapse>
        <Grid item xs>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} autoComplete="off">
            <TextField
              margin="normal"
              required
              fullWidth
              id="Name"
              label="Name"
              name="name"
              variant="filled"
              placeholder="Please enter your name"
              value={name}
              onBlur={() => setTouched(true)}
              onChange={(event) => setName(event.target.value)}
              error={touched && !name}
              helperText={touched && !name ? 'Please enter your name' : ''}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email address"
              name="email"
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
              disabled={!!token && !!email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              variant="filled"
              placeholder="Please enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched(true)}
              error={touched && (!password || password?.length < 8)}
              helperText={
                (touched && !password && 'Password is required') ||
                (touched && password?.length < 8 && 'Password must be at least 8 characters')
              }
              sx={inputStyles}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm-password"
              label="Confirm password"
              type="password"
              id="confirm-password"
              variant="filled"
              placeholder="Please re-enter your password"
              value={confirmPassword}
              onBlur={() => setTouched(true)}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={touched && password !== confirmPassword}
              helperText={touched && password !== confirmPassword && 'Passwords do not match'}
              sx={inputStyles}
            />
            <Button type="submit" fullWidth variant="contained" sx={buttonStyles} disabled={touched && isFormDisabled}>
              Register
            </Button>

            <Grid item>
              Already have an account?&nbsp;
              <LinkStyled to="/login">Login</LinkStyled>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Register
