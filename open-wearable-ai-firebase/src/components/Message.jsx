import React from "react";
// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import Avatar from "@material-ui/core/Avatar";
// import { deepOrange } from "@material-ui/core/colors";
import { Avatar, Box, createStyles, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";




const TimeStampRightBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== "buttonIcon" && prop !== "buttonBGColor"
})(({ buttonIcon, buttonBGColor }) => ({
    position: "absolute",
    fontSize: ".85em",
    fontWeight: "300",
    marginTop: "10px",
    bottom: "-3px",
    right: "5px"
}));

// const useStyles = makeStyles((theme) =>
//     createStyles({


//         messageTimeStampRight: {
//             position: "absolute",
//             fontSize: ".85em",
//             fontWeight: "300",
//             marginTop: "10px",
//             bottom: "-3px",
//             right: "5px"
//         },

//         avatarNothing: {
//             color: "transparent",
//             backgroundColor: "transparent",
//             width: theme.spacing(4),
//             height: theme.spacing(4)
//         },
//     })
// );

//avatarが左にあるメッセージ（他人）
export const MessageLeft = (props) => {
    const message = props.message ? props.message : "no message;j a;dslfkj alks;jf;klasjf;lasdj fl;a sjd;l";
    const timestamp = props.timestamp ? props.timestamp : "";
    const photoURL = props.photoURL ? props.photoURL : "dummy.js";
    const displayName = "Assistant";

    const theme = useTheme();

    return (
        <>
            <Box style={{
                display: "flex"
            }}>
                <Avatar
                    alt={displayName}
                    style={{
                        color: theme.palette.getContrastText(deepOrange[500]),
                        backgroundColor: deepOrange[500],
                        width: theme.spacing(4),
                        height: theme.spacing(4)
                    }}
                    src={photoURL}
                ></Avatar>
                <div>
                    <Typography variant="caption" color="initial" style={{
                        marginLeft: "20px"
                    }}>{displayName}</Typography>
                    s                    <Box sx={
                        {
                            position: "relative",
                            marginLeft: "20px",
                            marginBottom: "10px",
                            padding: "10px",
                            backgroundColor: "#A8DDFD",
                            // width: "60%",
                            //height: "50px",
                            textAlign: "left",
                            font: "400 .9em 'Open Sans', sans-serif",
                            border: "1px solid #97C6E3",
                            borderRadius: "10px",
                            "&:after": {
                                content: "''",
                                position: "absolute",
                                width: "0",
                                height: "0",
                                borderTop: "15px solid #A8DDFD",
                                borderLeft: "15px solid transparent",
                                borderRight: "15px solid transparent",
                                top: "0",
                                left: "-15px"
                            },
                            "&:before": {
                                content: "''",
                                position: "absolute",
                                width: "0",
                                height: "0",
                                borderTop: "17px solid #97C6E3",
                                borderLeft: "16px solid transparent",
                                borderRight: "16px solid transparent",
                                top: "-1px",
                                left: "-17px"
                            }
                        }
                    }>
                        <div>
                            <p style={{
                                padding: 0,
                                margin: 0
                            }}>{message}</p>
                        </div>
                        <TimeStampRightBox>{timestamp}</TimeStampRightBox>
                    </Box>
                </div>
            </Box>
        </>
    );
};
//avatarが右にあるメッセージ（自分）
export const MessageRight = (props) => {
    const message = props.message ? props.message : "no message";
    const timestamp = props.timestamp ? props.timestamp : "";
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "flex-end",
        }}>
            <Box sx={{
                position: "relative",
                marginRight: "20px",
                marginBottom: "10px",
                padding: "10px",
                backgroundColor: "#f8e896",
                width: "60%",
                //height: "50px",
                textAlign: "left",
                font: "400 .9em 'Open Sans', sans-serif",
                border: "1px solid #dfd087",
                borderRadius: "10px",
                "&:after": {
                    content: "''",
                    position: "absolute",
                    width: "0",
                    height: "0",
                    borderTop: "15px solid #f8e896",
                    borderLeft: "15px solid transparent",
                    borderRight: "15px solid transparent",
                    top: "0",
                    right: "-15px"
                },
                "&:before": {
                    content: "''",
                    position: "absolute",
                    width: "0",
                    height: "0",
                    borderTop: "17px solid #dfd087",
                    borderLeft: "16px solid transparent",
                    borderRight: "16px solid transparent",
                    top: "-1px",
                    right: "-17px"
                }
            }}>
                <p>{message}</p>
                <TimeStampRightBox>{timestamp}</TimeStampRightBox>
            </Box>
        </Box>
    );
};