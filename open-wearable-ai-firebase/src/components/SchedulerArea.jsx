import { List, Typography, AppBar, Toolbar, IconButton, DialogContent, DialogActions, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Paper, Chip, Slide, TableContainer, Table, TableBody, TableRow, TableCell, Card } from '@mui/material'
import Box from '@mui/material/Box';
import { useFirestoreContext } from '../providers/FirestoreProvider'
import { deleteDoc, deleteField, doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useConfirm } from 'material-ui-confirm';
import Delete from '@mui/icons-material/Delete';



const SchedulerArea = () => {
    const firestoreContext = useFirestoreContext();

    const tasks = firestoreContext?.tasksArray ?? [];
    const confirm = useConfirm();
    return (
        <Box sx={{ my: 2, mx: 0.1 }}>
            <TableContainer component={Paper} sx={{ overflow: 'scroll' }}>
                <Table size="small" >
                    <TableBody>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="right" >Time</TableCell>
                            <TableCell align="left" component="th" scope="row" color={'secondary'}>
                                <Typography variant="body2" >Name</Typography>
                            </TableCell>
                            <TableCell align="right" width={10} >Done</TableCell>
                            <TableCell align="right" size='small'>
                                {/* <IconButton size='small' onClick={() => { }}><Delete />
                                    </IconButton> */}
                            </TableCell>
                        </TableRow>
                        {tasks.map((task) => (
                            <TableRow
                                key={task.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right" ><Typography variant="body1" fontWeight={'bold'}>{task.start_time_string ? task.start_time_string : '-'}</Typography></TableCell>
                                <TableCell align="left" component="th" scope="row" color={'secondary'}>
                                    <Typography variant="body1" >{task.title}</Typography>
                                </TableCell>
                                {/* <TableCell align="right" >{task.is_completed ? '✅' : '🔲'}</TableCell> */}
                                <TableCell align="right" >{'🔲'}</TableCell>
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
                                                // const documentRef = getFirestore().collection("users").doc("dummy_user").collection("dailyObjects").doc("dummy_date");

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

export default SchedulerArea