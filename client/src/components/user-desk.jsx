import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { user } from "../utils/utils"
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import axios from "axios";
import Sidebar from "./sidebar"

const Userdesk = ({ optionMenu, data }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    // menu handlers
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (option) => {
        if(option === "Logout"){
            navigate('/')
            localStorage.removeItem("userID");
        }else{
            optionMenu(option)
        }
        setAnchorEl(null);
    };
    
    if(data){
        return(
            <>
                <div className="left-header">
                    <div style={{display: 'flex', alignItems: 'center', color: "white", justifyContent: 'space-between', width: '100%'}}>
                        <img src={data.photoProfile} className='profile-user'/>
                        <div>
                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? 'long-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={(event) => setAnchorEl(event.currentTarget)}
                            >
                                <MoreVert style={{fill: 'white'}}/>
                            </IconButton>

                            <Menu
                                id="long-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'long-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClick}
                                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                                PaperProps={{
                                    style: {
                                        maxHeight: 48 * 4.5,
                                        width: '15ch',
                                        background: '#29204D',
                                        color: 'white',
                                        transform: 'translateX(-100px)'
                                    },
                                }}
                            >
                                {["profile", "all contact", "Logout"].map(option=> (
                                    <MenuItem key={option} onClick={() => handleClick(option)}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Userdesk