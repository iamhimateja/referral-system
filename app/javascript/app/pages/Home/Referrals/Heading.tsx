import { Typography } from '@mui/material'
import React from 'react'

type ReferralHeadingProps = {
  totalReferrals: number
  totalAcceptedReferrals: number
}

const ReferralHeading = ({ totalReferrals, totalAcceptedReferrals }: ReferralHeadingProps) => {
  return (
    <Typography variant="h6" gutterBottom py="1rem" color="#706f6f" mt={10} paddingLeft="1rem">
      List of referrals sent
      <Typography variant="subtitle2">
        Out of {totalReferrals} referrals sent, {totalAcceptedReferrals} were accepted.
      </Typography>
    </Typography>
  )
}

export default ReferralHeading
