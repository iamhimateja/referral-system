import type { SxProps, Theme } from '@mui/material'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const LinkStyled = styled(Link)`
  font-weight: 500;
  color: #0062ff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

export const Logo = styled.img`
  max-width: 5rem;
  margin-bottom: 1rem;
`
export const Heading = styled.h1`
  margin: 0;
  font-weight: 600;
  font-size: 1.75rem;
`
export const SubHeading = styled.span`
  color: #979797;
  font-size: 0.9rem;
  letter-spacing: 0.03rem;
  margin-bottom: 1rem;
`

export const buttonStyles: SxProps<Theme> = {
  mt: 3,
  mb: 2,
  textTransform: 'unset',
  fontSize: '1rem',
  padding: '0.5rem 0.75rem',
  borderRadius: '0.375rem',
}

export const inputStyles: SxProps<Theme> = {
  letterSpacing: '0.04rem',
}
