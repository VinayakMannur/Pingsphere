import { Stack } from '@mui/material'
import React, { useEffect } from 'react'
import GroupChats from '../../components/GroupChats'
import { useDispatch } from 'react-redux';
import { UpdateConversation } from '../../redux/slices/app';

const Group = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(UpdateConversation())
  },[])

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