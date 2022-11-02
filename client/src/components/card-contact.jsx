import React, { createRef, useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material"
import { formatSendMessage } from "../utils/utils"

export const CardChat = ({ data, toConversation }) => {
    const room = createRef()

    const currentContact = () => {
        toConversation(room.current.innerHTML)
    }

    return(
        <>
            <Grid container sx={{ borderBottom: "1px solid rgb(98, 93, 93)", p: 1,  }} onClick={currentContact} spacing={0}>
                <Grid item xs={3} 
                    sx={{ 
                        display: "flex", 
                        justifyContent: 'center',
                        alignItems: "center",
                        width: "100%",    
                    }}>   
                    <img src={data.profileUrl} className="card-profile"/>
                </Grid>
                
                <Grid item xs={9} sx={{ p: .5 }}>
                    <Box 
                        sx={{   
                            display: "flex", 
                            justifyContent: 'space-between',
                            width: "100%",
                            alignItems: "center",
                        }}
                    >
                        <Typography sx={{ fontWeight: 'bold', fontSize: '17px' }} ref={room}>{data.username}</Typography>
                    </Box>
                    <Box
                        sx={{
                          width: "95%",
                          height: "1.2em",
                          overflow: "hidden",
                          textOverflow: "ellipsis", 
                          whiteSpace: "nowrap",
                          fontSize: '80%',
                          fontWeight: 'normal',
                          color: '#9AA0A6'
                        }}
                        dangerouslySetInnerHTML={{ __html: data.isOnline ? "online" : "offline" }}
                    >
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default CardChat