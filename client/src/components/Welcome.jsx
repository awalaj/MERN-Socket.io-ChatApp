import React from "react";
import WelcomRobot from "../assets/robot.gif"
// import { user } from "../utils/utils"

const Welcome = ({ users }) => {
    return(
        <div className='welcome'>
            <img src={WelcomRobot} style={{height: '20rem'}}/>
            <h1>Welcome, <span style={{color: '#232382'}}>{users}!</span></h1>
            <h3>Please select a chat to Start messaging.</h3>
        </div>
    )
}

export default Welcome