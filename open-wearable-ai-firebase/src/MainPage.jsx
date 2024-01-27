import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Box, Divider, List, Typography, Button } from '@mui/material'
import { httpsCallable } from 'firebase/functions'
import { functions } from './services/firebase'
// import _ from 'lodash';
import { useFirestoreContext } from './providers/FirestoreProvider'
import TextMessageInput from './components/TextMessageInput'
import Header from './layouts/authorised/Header'
import SchedulerArea from './components/SchedulerArea'
import NotesArea from './components/NotesArea'
import ChatWithAIArea from './components/ChatWithAIArea'
import MemoryArea from './components/MemoryArea'

const MainPage = () => {
    const [count, setCount] = useState(0)
    const topScrollRef = useRef(null);
    const scrollRef = useRef(null);

    const [messages, setMessages] = useState([]);

    const firestoreContext = useFirestoreContext();

    async function sendMessageToAssistant() {
        // const messageText = "my name is Igor"
        // const messageText = "What is my name?"
        const messageText = "Please add a meeting with Rob to my tasks"
        firestoreContext.addTextMessageToAssistant(messageText);

    }



    async function listMessages() {

        const result = await httpsCallable(functions, 'listmessages')({
            // userId: sessionUserId,
            // originalText: originalText,
        }).catch(async (error) => {
            console.log('error', error)
        });

        // convert to array
        // const resultArr = result.

        console.log('result', result)

        const _messages = result.data?.map((messageObj) => {
            return {
                id: messageObj.id,
                message: messageObj.content[0].text.value,
                createdAt: messageObj.created_at,
                runId: messageObj.run_id,
            }
        });

        _messages.reverse();


        setMessages(_messages);
        console.log('messages', messages)
    }

    return (
        <>
            <Header setIsDrawerOpen={false} />
            <Box sx={{
                mt: 8,
                // Устанавливаю максимальную высоту
                height: '90vh',
                //Устанавливаю максимальную ширину
                maxWidth: 'lg',
                //Растягиваю контейнер на всю ширину экрана, но он ограничется maxWidth
                width: '100vw',
                // Эта команда задает высоту контейнера в экран под которую подстраиваются вложенные элементы
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                // bgcolor: 'blue',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    overflowY: 'scroll',
                    // alignContent: 'center',
                    // alignItems: 'center',
                }}>
                    <Box sx={{
                        display: 'flex',
                        overflowY: 'scroll',
                        flexDirection: 'column',
                        width: '50vw',
                        margin: '0 auto',
                    }}>
                        <Typography variant="h5" color="initial">Tasks list</Typography>
                        <Box sx={{
                            flexDirection: 'column',
                            // bgcolor: 'orange',
                        }}>
                            {/* <MemoryArea /> */}

                            <SchedulerArea />
                        </Box>
                    </Box>
                    {/* <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '40vw',
                    }}>
                        <Typography variant="h5" color="initial">Notes (Dummy)</Typography>

                        <NotesArea />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '30vw',
                    }}>
                        <Typography variant="h5" color="initial">Chat (Dummy)</Typography>
                        <ChatWithAIArea />
                    </Box> */}
                </Box>

            </Box>
            <div>
                {/* <p>Recording: {recording} | Speaking: {speaking} | Transcribing: {transcribing} | Transcribed Text: {transcript.text}</p> */}
                {/* <button onClick={() => handleStart()}>Start</button> */}
                {/* <button onClick={() => pauseRecording()}>Pause</button> */}
                {/* <button onClick={() => handleStop()}>Stop</button> */}
                <button onClick={() => sendMessageToAssistant()}>sendMessageToAssistant</button>
                <button onClick={() => listMessages()}>List messages</button>
            </div>
            <TextMessageInput />

        </>
    )
}

export default MainPage