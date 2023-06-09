import React, { useState } from 'react'
import type { ReferralData } from '../../../types'
import {
  Avatar,
  Chip,
  CircularProgress,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from '@mui/material'

import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined'
import { getGravatarAvatar, stringToColor } from '../../../helpers'

type ReferralItemProps = {
  referral: ReferralData
  handleReferralResend: (token: string) => Promise<void>
}

const ReferralItem = ({ referral, handleReferralResend }: ReferralItemProps) => {
  const [loading, setLoading] = useState(false)
  const handleResend = async () => {
    setLoading(true)
    await handleReferralResend(referral.token).then(() => {
      setLoading(false)
    })
  }

  return (
    <ListItem
      sx={{
        marginBottom: '0.5rem',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          background: '#ebe8e8',
          borderRadius: '0.375rem',
        },
      }}
      secondaryAction={
        <>
          {referral.claimed ? (
            <Tooltip title="This user has joined via your referral link" placement="right">
              <Chip size="small" label="joined" sx={{ letterSpacing: '0.03rem' }} />
            </Tooltip>
          ) : (
            <Tooltip title="This user has not joined yet" placement="right">
              <Chip size="small" label="pending" sx={{ letterSpacing: '0.03rem' }} />
            </Tooltip>
          )}
          {!referral.claimed && (
            <Tooltip title="Resend referral email?" placement="right">
              <IconButton edge="end" aria-label="Resend" onClick={handleResend}>
                {loading ? <CircularProgress size={20} /> : <ReplayOutlinedIcon />}
              </IconButton>
            </Tooltip>
          )}
        </>
      }
    >
      <ListItemAvatar>
        <Avatar
          src={getGravatarAvatar(referral.email)}
          sx={{
            bgcolor: stringToColor(referral.claimed_user ?? referral.email),
          }}
        />
      </ListItemAvatar>
      <ListItemText primary={referral.claimed_user ?? referral.email} secondary={referral.claimed && referral.email} />
    </ListItem>
  )
}

export default ReferralItem
