import React from 'react'
import { List, Switch as MUISwitch, ListItem, ListItemButton, ListItemIcon, ListItemText, Dialog, Switch, Stack, Typography, AppBar, Toolbar, IconButton, DialogContent, DialogActions, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Paper, Chip, Slide, TableContainer, Table, TableBody, TableRow, TableCell, Card } from '@mui/material'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import Delete from '@mui/icons-material/Delete';
import { useFirestoreContext } from '../providers/FirestoreProvider'
import { deleteDoc, deleteField, doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useConfirm } from 'material-ui-confirm';

const timePeriods = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", '20:00']
// const tasks = [{
//     id: '11',
//     title: 'Change pin code in my main doors',
//     is_completed: false,
//     start_time_string: '8:00',
//     length_in_minutes: 30,
//     isLocked: false,
// },
// {
//     id: '22',
//     title: 'Fix bug with todo app',
//     is_completed: true,
//     start_time_string: '15:00',
//     length_in_minutes: 30,
//     isLocked: false,
// },
// {
//     id: '33',
//     title: 'Send invoice to Stasy',
//     is_completed: false,
//     // start_time_string: '15:00',
//     // length_in_minutes: 30,
//     isLocked: false,
// }
// ]


const MemoryArea = () => {
    const firestoreContext = useFirestoreContext();

    const tasks = [
        {
            title: 'Boss name is Igor',
        },
        {
            title: 'Igor\'s interests are programming, reading, and playing chess',
        },
        {
            title: 'Igor likes you to answer concise can straight to the point',
        },
        {
            title: 'Igor\'s home address is 1234 Main Street, San Francisco, CA 94123',
        },
    ];
    const confirm = useConfirm();
    return (
        <Box sx={{ my: 2, mx: 0.1 }}>
            <TableContainer component={Paper} sx={{ overflow: 'scroll' }}>
                <Table size="small" >
                    <TableBody>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left" size='small' >Memory (dummy data)</TableCell>
                            {/* <TableCell align="left" component="th" scope="row" color={'secondary'}>
                                <Typography variant="body2" >Name</Typography>
                            </TableCell> */}
                            {/* <TableCell align="right" width={10} >Done</TableCell> */}
                            <TableCell align="right" size='small'>
                                Action
                                {/* <IconButton size='small' onClick={() => { }}><Delete />
                                    </IconButton> */}
                            </TableCell>
                        </TableRow>
                        {tasks.map((task) => (
                            <TableRow
                                key={task.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {/* <TableCell align="right" ><Typography variant="body1" fontWeight={'bold'}>{task.start_time_string ? task.start_time_string : '-'}</Typography></TableCell> */}
                                <TableCell align="left" component="th" scope="row" color={'secondary'}>
                                    <Typography variant="body1" >{task.title}</Typography>
                                </TableCell>
                                {/* <TableCell align="right" >{task.is_completed ? '✅' : '🔲'}</TableCell> */}
                                {/* <TableCell align="right" >{'🔲'}</TableCell> */}
                                {/* <TableCell align="right">
                                                        <IconButton
                                                            disabled={false}
                                                            onClick={() => {

                                                            }}>
                                                            {< LockIcon fontSize="small" />}

                                                        </IconButton>
                                                    </TableCell> */}
                                <TableCell align="right" size='small' width={10}>
                                    <IconButton size='small' onClick={() => {
                                        confirm({ description: "This action is permanent!" })
                                            .then(() => {
                                                console.log('delete', task.id)
                                                const documentId = task.id;
                                                // const documentRef = getFirestore().collection("users").doc("dummy_user").collection("dailyObjects").doc("7_01_2024");

                                                const itemRef = doc(db, "users", "dummy_user", "dailyObjects", "dummy_date");
                                                //delete param from firestore
                                                updateDoc(itemRef, {
                                                    [`tasks.${documentId}`]: deleteField(),
                                                });

                                            })
                                            .catch(() => {
                                                /* ... */
                                            });

                                    }}><Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
        </Box>
    )
}

export default MemoryArea