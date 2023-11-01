import React from 'react'
import { Divider, IconButton, Stack } from '@mui/material'
import { GithubLogo, GoogleLogo, TwitterLogo } from 'phosphor-react'

const AuthSocial = () => {
  return (
    <div>
        <Divider>
            OR
        </Divider>
        <Stack mt={2} direction={'row'} spacing={3} alignItems={'center'} justifyContent={'center'}>
            <IconButton>
                <GoogleLogo color='#DF3E30'/>
            </IconButton>
            <IconButton color='inherit'>
                <GithubLogo />
            </IconButton>
            <IconButton>
                <TwitterLogo color='#1C9CEA'/>
            </IconButton>
        </Stack>
    </div>
  )
}

export default AuthSocial