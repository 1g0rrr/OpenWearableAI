import { Box, Button, Chip, Stack } from '@mui/material'
import React from 'react'
import { MessageLeft, MessageRight } from './Message'
import MicIcon from '@mui/icons-material/Mic';

const ChatWithAIArea = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'scroll',
            // bgcolor: 'red',
            m: 2,
            mb: 15,
            // width: '100%',
        }}>
            {Array.from(Array(4)).map((i) => <Box
                sx={{
                    // bgcolor: 'green',
                }} key={i}
            >
                <MessageLeft message="Hello, how are you?" />
                <MessageRight message="I'm fine, thanks?" />

            </Box>)}
            {/* <Box sx={{ mb: 20, mt: 8 }}>
            </Box> */}
            {/* <Box
                display="flex"
                justifyContent="center"
                alignItems="center"

            >
                <Stack direction="column" alignItems="center" justifyContent="space-between" sx={{
                    position: 'absolute',
                    bottom: 0,
                    px: 2,
                    mb: 3
                }}>
                    <Chip color='chip' sx={{ mb: 1 }} size='medium' label={`Summarization...`} />
                    <Button variant="contained" color="primary" endIcon={<MicIcon />} >
                        record
                    </Button>

                </Stack>
            </Box> */}
        </Box>
    )
}

export default ChatWithAIArea