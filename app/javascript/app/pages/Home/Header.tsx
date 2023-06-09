import React, { useEffect } from 'react'
import { AppBar, Avatar, Chip, CircularProgress, IconButton, Stack, Toolbar, Tooltip } from '@mui/material'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import { api, getGravatarAvatar } from '../../helpers'

type HeaderProps = {
  handleAddNewReferral: () => void
}

type MeData = {
  email?: string
  name?: string
}

const Header = ({ handleAddNewReferral }: HeaderProps) => {
  const [userData, setUserData] = React.useState<MeData>({})

  const [loading, setLoading] = React.useState(false)

  const handleLogout = async () => {
    await api.logout().then(() => {
      window.location.href = '/'
    })
  }

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
      await api.fetchMe().then((response) => {
        if (response.data) {
          setLoading(false)
          setUserData(response.data as MeData)
        }
      })
    }

    fetchUserData()
  }, [])

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <Avatar src="/logo.png" />

        {loading ? (
          <CircularProgress size={20} />
        ) : (
          <Tooltip title={`You logged in as ${userData.email}`}>
            <Chip
              variant="filled"
              color="primary"
              avatar={<Avatar alt={userData.name} src={getGravatarAvatar(userData.email)} />}
              label={userData.name}
            />
          </Tooltip>
        )}

        <Stack direction="row">
          <Tooltip title="Add new referral">
            <IconButton onClick={handleAddNewReferral}>
              <Avatar sx={{ padding: '0.5rem', color: '#979797', bgcolor: 'white' }}>
                <PersonAddAltIcon />
              </Avatar>
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton onClick={handleLogout}>
              <Avatar sx={{ padding: '0.5rem', color: '#979797', bgcolor: 'white' }}>
                <PowerSettingsNewIcon />
              </Avatar>
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Header
