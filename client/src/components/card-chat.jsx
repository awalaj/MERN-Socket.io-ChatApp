import React, { createRef, useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material"
import { formatSendMessage } from "../utils/utils"

export const CardChat = ({ data, changeRoom }) => {
    const room = createRef()

    const handleCurrentChat = () => {
        changeRoom(room.current.innerHTML)
    }

    const textExists = data.hasOwnProperty("text") //check exists text keys of object
    const imageExists = data.image //check image not null

    return(
        <>
            <Grid container sx={{ borderBottom: "1px solid rgb(98, 93, 93)", p: 1,  }} onClick={handleCurrentChat} spacing={0}>
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
                        { textExists && <Typography sx={{ fontWeight: 'lighter', fontSize: '10px', color: '#9AA0A6' }} variant="caption" display="block" gutterBottom>{formatSendMessage(data.timeStamp)}</Typography>}
                    </Box>
                    {/* <TextMessage image={true} text={false}/> */}
                    {
                        (textExists || imageExists) &&
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
                            dangerouslySetInnerHTML={{ __html: `${imageExists ? '<i class="bi bi-camera-fill""></i>&nbsp;Foto' : ''} ${textExists ? data.text.replace("<div>", '&nbsp;'):""}` }}
                        ></Box>
                        
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default CardChat