import { Stack } from '@mui/material'
import React from 'react'
import GroupChats from '../../components/GroupChats'

const Group = () => {

  return (
    <>
        <Stack direction={'row'} sx={{width:"100%"}}>
            {/* left */}
            <GroupChats/>

            {/* right */}
        </Stack>
    </>
  )
}

export default Group