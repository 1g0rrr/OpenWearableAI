import { Timestamp, addDoc, collection, deleteDoc, deleteField, doc, getDoc, onSnapshot, serverTimestamp, setDoc, updateDoc, writeBatch } from 'firebase/firestore';
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { ADD_TEXT_URL, db } from '../services/firebase';
import { uuidv4 } from "@firebase/util";
import { Navigate, redirect, useNavigate, useParams } from 'react-router-dom';
import { httpsCallable } from 'firebase/functions';

import { useCommonSnackbarsContext } from './CommonSnackbarsProvider';
import { useConfirm } from 'material-ui-confirm';
import axios from 'axios';



const FirestoreContext = createContext();

const FirestoreProvider = ({ children }) => {

    const navigate = useNavigate();
    const showCommonSnackbar = useCommonSnackbarsContext();
    const confirm = useConfirm();

    const [currentDocument, setCurrentDocument] = useState({});

    const tasksArray = Object.values(currentDocument?.tasks ?? {});

    // Sort by HH:MM string
    tasksArray?.sort((a, b) => {
        if (a.start_time_string && b.start_time_string) {
            return a.start_time_string.localeCompare(b.start_time_string);
        }
        if (!a.start_time_string) {
            return -1;
        }
        if (!b.start_time_string) {
            return 1;
        }
        return 0;
    });

    console.log('FS P', tasksArray)

    // Subsribe to user data
    useEffect(() => {

        const itemRef = doc(db, "users", "dummy_user", "dailyObjects", "dummy_date");
        console.log('itemRef', itemRef)
        const unsubscribe = onSnapshot(itemRef, (querySnapshot) => {
            console.log('querySnapshot', querySnapshot)
            const curDocument = querySnapshot.data();
            curDocument.ref = itemRef;
            setCurrentDocument(curDocument);

        });
        return () => {
            unsubscribe();
        };
    }, [navigate])


    const addTextMessageToAssistant = useCallback(async function (textMessage) {

        const fetchUrl = ADD_TEXT_URL;

        const response = await axios.post(fetchUrl, {
            textMessage: textMessage,
        }).catch(err => {
            console.log('err', err);
        });
        const responseText = response?.data?.responseText;
        console.log('translatedText', responseText)
        // return translatedText;

        // const { responseText, base64 } = result.data

        // const assistantAnswerText = responseText
        // console.log('assistantAnswerText', assistantAnswerText)
    }, [])

    return (
        <FirestoreContext.Provider value={{
            addTextMessageToAssistant,
            currentDocument,
            tasksArray,
        }}>
            {children}
        </FirestoreContext.Provider>
    )
}


export default FirestoreProvider



export function useFirestoreContext() {
    return useContext(FirestoreContext);
}