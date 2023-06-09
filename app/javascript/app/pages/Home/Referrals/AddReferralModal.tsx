import React, { useEffect, useMemo, useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'
import { Button, TextField } from '@mui/material'
import { validateEmail } from '../../../helpers'
import { buttonStyles, inputStyles } from '../../../components/styles'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '0.375rem',
  p: 4,
}

type AddReferralModalProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  createNewReferral: (email: string) => void
}

const AddReferralModal = ({ open, setOpen, createNewReferral }: AddReferralModalProps) => {
  const [email, setEmail] = React.useState('')
  const [touched, setTouched] = useState(false)

  const handleClose = () => setOpen(false)

  const isFormDisabled = useMemo(() => {
    return !email || !validateEmail(email)
  }, [email])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!isFormDisabled) createNewReferral(email)
  }

  useEffect(() => {
    if (open) {
      setEmail('')
      setTouched(false)
    }
  }, [open])

  return (
    <div>
      <Modal
        aria-labelledby="new-referral-modal-title"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="new-referral-modal-title" variant="h6" component="h2">
              Refer a friend
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
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
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ ...buttonStyles, mt: 1, mb: 1 }}
                disabled={touched && isFormDisabled}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default AddReferralModal
