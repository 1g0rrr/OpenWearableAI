import { TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import { useFirestoreContext } from '../providers/FirestoreProvider';

const TextMessageInput = () => {

    const firestoreContext = useFirestoreContext();

    const [textMessage, setTextMessage] = useState('');


    return (
        <>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" value={textMessage} onChange={(e) => {
                setTextMessage(e.target.value)
            }} />
            <Button variant="text" color="primary" onClick={() => {
                console.log('textMessage', textMessage)
                firestoreContext.addTextMessageToAssistant(textMessage);
            }}>
                Send
            </Button>
        </>
    )
}

export default TextMessageInput