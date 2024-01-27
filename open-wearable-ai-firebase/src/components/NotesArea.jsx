import React from 'react'
import { List, Switch as MUISwitch, ListItem, ListItemButton, ListItemIcon, ListItemText, Dialog, Switch, Stack, Typography, AppBar, Toolbar, IconButton, DialogContent, DialogActions, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Paper, Chip, Slide, TableContainer, Table, TableBody, TableRow, TableCell, Card } from '@mui/material'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';

const NotesArea = () => {
    // 'note 2 text'.repeat(100), 'note 3 test'.repeat(100)
    const notes = [
        `The important thing I noticed about the voice interface is that it's completely comfortable and familiar to us, people who are used to talking to each other with unpolished speeches. 
       `,
        'But it will work only with a smart enough AI, which will operate not with voice commands, but with the sence of the unpolished ramblings.',
    ]


    return (
        <Box sx={{
            flexDirection: 'column',
            overflowY: 'scroll',
            // bgcolor: 'yellow',
        }}>
            <List>
                {notes.map((note) => <Box
                    sx={{
                        display: 'flex',
                        // bgcolor: 'red',
                        // width: 1200,
                        width: 'xs',
                    }} key={note}
                >
                    <ListItem
                        // ref={ref}
                        key={`user-asd`} sx={{}} dense>

                        <ListItemText>
                            <Card

                                sx={{
                                    borderRadius: 2,
                                    pb: 1,
                                    // minWidth: 275,
                                    border: 1,
                                    borderColor: grey[300],
                                    // boxShadow: 8,
                                    boxShadow: 0,
                                    p: 2,
                                    // bgcolor: '#FFFBF5',
                                    // bgcolor: isGeneralBoosted ? amber[50] : 'inherit',
                                    // bgcolor: isGeneralBoosted ? lightGreen[50] : 'inherit',

                                }}
                                onClick={(e) => {

                                }}
                            >
                                {note}
                            </Card>
                        </ListItemText>
                    </ListItem>
                </Box>)}
            </List>

        </Box>
    )
}

export default NotesArea