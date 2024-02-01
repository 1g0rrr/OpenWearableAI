import { TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import { useFirestoreContext } from '../providers/FirestoreProvider';
import { useCommonSnackbarsContext } from '../providers/CommonSnackbarsProvider';

const TextMessageInput = () => {

    const firestoreContext = useFirestoreContext();
    const showCommonSnackbar = useCommonSnackbarsContext();

    const [textMessage, setTextMessage] = useState('');


    return (
        <>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" value={textMessage} onChange={(e) => {
                setTextMessage(e.target.value)
            }} />
            <Button variant="text" color="primary" onClick={async () => {
                console.log('textMessage', textMessage)
                const result = await firestoreContext.addTextMessageToAssistant(textMessage);
                console.log('result', result)
                showCommonSnackbar(result);
            }}>
                Send
            </Button>
        </>
    )
}

export default TextMessageInput