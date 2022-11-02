import React, { useEffect, useState } from "react"
import { createRoot } from "react-dom/client"
import App from "./pages/Router"
import ContentEditable from "react-contenteditable";
import axios from "axios"
import { Button, InputLabel, SwipeableDrawer, Input, InputAdornment } from "@mui/material"
import { Edit } from "@mui/icons-material"
import { socket } from "./utils/utils"
import { FormControl } from "react-bootstrap";
// import "./demo.css"
import $ from "jquery"

class Apps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focus: false
        }
    }


    render() {
        return (
            <>
                {/* <FormControl variant="standard"> */}
                    {/* <InputLabel htmlFor="input"><Edit/></InputLabel> */}
                    {/* <Input
                        label="{data.name}"
                        variant="standard"
                        color="success"
                        sx={{ border: "none !important" }}
                        // value="bacot"
                        endAdornment={<InputAdornment position="end"><Edit/></InputAdornment>}
                    /> */}
                {/* </FormControl> */}
                {/* <div className="contai">
                    <input className="input"/>
                    <Edit/>
                    <div className="border"></div>
                </div> */}
                {/* <div className="input-container">
                    <input className="text-input" onFocus={() => console.log("da")} onBlur={() => console.log("mati")}/>
                    {/* <div className="login-form-field-border"></div> */}
                {/* </div> */}
            </> 
        )
    }
}

const container = document.getElementById('root');
const root = createRoot(container); 
root.render(<App/>);