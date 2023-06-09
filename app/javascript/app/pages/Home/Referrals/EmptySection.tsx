import React from 'react'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { buttonStyles } from '../../../components/styles'

type EmptySectionProps = {
  setReferralModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EmptySection = ({ setReferralModalOpen }: EmptySectionProps) => {
  return (
    <Box display="flex" sx={{ minHeight: '100vh', placeContent: 'center', placeItems: 'center' }}>
      <Paper sx={{ width: '60%' }}>
        <Grid container direction="column">
          <Grid item display="flex" sx={{ placeContent: 'center', placeItems: 'center' }}>
            <Typography variant="h6" gutterBottom py="5rem" color="#706f6f" m={0}>
              No referrals sent yet
            </Typography>
          </Grid>
          <Grid
            item
            display="flex"
            sx={{ placeContent: 'center', placeItems: 'center', boxShadow: 'inset 0 1px 0 0 rgba(0,0,0,0.1)' }}
          >
            <Button
              fullWidth
              variant="text"
              sx={{ ...buttonStyles, margin: 0 }}
              startIcon={<PersonAddAltIcon />}
              onClick={() => setReferralModalOpen(true)}
            >
              Add new referral
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default EmptySection
