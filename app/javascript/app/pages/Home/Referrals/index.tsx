import React from 'react'
import { TransitionGroup } from 'react-transition-group'
import { Collapse, List } from '@mui/material'
import ReferralItem from './ReferralItem'
import type { ReferralData } from '../../../types'

type ReferralsProps = {
  referrals: ReferralData[]
  handleReferralResend: (token: string) => Promise<void>
}

const Referrals = ({ referrals, handleReferralResend }: ReferralsProps) => {
  return (
    <List>
      <TransitionGroup>
        {referrals.map((referral) => (
          <Collapse key={referral.token}>
            <ReferralItem key={referral.token} referral={referral} handleReferralResend={handleReferralResend} />
          </Collapse>
        ))}
      </TransitionGroup>
    </List>
  )
}

export default Referrals
