import React, { useEffect, useState } from 'react'
import { Alert, Container, IconButton, Portal, Snackbar } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { api } from '../../helpers'
import Header from './Header'
import Loading from '../../components/Loading'
import AddReferralModal from './Referrals/AddReferralModal'
import type { BasicResponse, ReferralData } from '../../types'
import Referrals from './Referrals'
import ReferralHeading from './Referrals/Heading'
import EmptySection from './Referrals/EmptySection'

const Home = () => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [referrals, setReferrals] = useState<ReferralData[]>([])
  const [referralModalOpen, setReferralModalOpen] = useState(false)
  const [openSuccessToast, setToastVisibility] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastSeverity, setToastSeverity] = useState<'success' | 'error'>('success')

  useEffect(() => {
    const fetchReferralData = async () => {
      await api.fetchAllReferrals().then((data) => {
        setLoading(false)
        setReferrals(data)
      })
    }

    fetchReferralData()
  }, [])

  const createNewReferral = async (email: string) => {
    await api.createReferral(email).then((response) => {
      if (response.status === 201) {
        setReferrals([response.data as ReferralData, ...referrals])
        setReferralModalOpen(false)
        setToastVisibility(true)
        setToastSeverity('success')
        setToastMessage('Referral sent successfully')
      } else {
        const data = response.data as BasicResponse
        setToastVisibility(true)
        setToastMessage(data.error!)
        setToastSeverity('error')
      }
    })
  }

  const handleReferralResend = async (token: string) => {
    return await api.resendReferral(token).then((data: BasicResponse) => {
      setToastVisibility(true)
      if (data.message) {
        setToastMessage(data.message)
        setToastSeverity('success')
      }

      if (data.error) {
        setToastMessage(data.error)
        setToastSeverity('error')
      }
    })
  }

  const handleCloseToast = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setToastVisibility(false)
  }

  return (
    <>
      <div ref={containerRef}>
        {loading && <Loading />}
        <Header handleAddNewReferral={() => setReferralModalOpen(true)} />
        <Container maxWidth="sm">
          {referrals.length === 0 ? (
            <EmptySection setReferralModalOpen={setReferralModalOpen} />
          ) : (
            <>
              <ReferralHeading
                totalReferrals={referrals.length}
                totalAcceptedReferrals={referrals.filter((referral) => referral.claimed).length}
              />
              <Referrals referrals={referrals} handleReferralResend={handleReferralResend} />
            </>
          )}
        </Container>
      </div>
      <Portal container={containerRef.current}>
        <AddReferralModal
          open={referralModalOpen}
          setOpen={setReferralModalOpen}
          createNewReferral={createNewReferral}
        />

        <Snackbar
          open={openSuccessToast}
          autoHideDuration={6000}
          onClose={handleCloseToast}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseToast}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          <Alert onClose={handleCloseToast} severity={toastSeverity} sx={{ width: '100%' }}>
            {toastMessage}
          </Alert>
        </Snackbar>
      </Portal>
    </>
  )
}

export default Home
