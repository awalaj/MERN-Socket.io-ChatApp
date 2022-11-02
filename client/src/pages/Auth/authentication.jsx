import React, { createRef, useEffect } from "react";
import { useForm } from "react-hook-form"
import "./Authentication.css"
import LoginLog from "../../assets/login.svg"
import Swal from "sweetalert2";
import RegisterLog from "../../assets/register.svg"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { socket, userID } from "../../utils/utils"

const Authentication = ({ user }) => {
    const panel = createRef()
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    // handle form submit
    const handleSignIn = async (data,e) => {
        e.preventDefault();

        const login = await axios.post('http://localhost:5000/Login', { data })

        const res = (await login).data
    
        if(res.status === "succes"){
            navigate('/Chats')

            localStorage.setItem("userID", res.userId)
        }else{
            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                showCloseButton: true,
                timer: 3000,
                background: 'transparent',
                color: '#f56470',
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener("mouseleave", Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'error',
                title: 'login failed',
            })
        }
    }

    const handleSignUp = async (data,e) => {
        e.preventDefault();

        const register = await axios.post('http://localhost:5000/Register', { data })
        
        const res = (await register).data

        if(res.status === "succes") {
            panel.current.classList.remove("sign-up-mode")
        }else{
            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                showCloseButton: true,
                timer: 3000,
                background: 'transparent',
                color: '#f56470',
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener("mouseleave", Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'error',
                title: 'registration failed',
            })
        }
    }

    useEffect(() => {
        socket.disconnect()
        if(userID){
            user(userID)
            navigate('/Chats')
        }
    }, [userID])

    return(
        <>
            <div className="containerAuth" ref={panel}>
                <div className="forms-container">
                    <div className="signin-signup">
                        <form onSubmit={handleSubmit(handleSignIn)} className="sign-in-form">
                            <h2 className="title">Sign in</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type="text" placeholder="username" {...register("usernameLogIn")} required/>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" placeholder="password" {...register("passwordLogIn")} required/>
                            </div>
                            <input type="submit" className="btn" value="Sign in"/>
                        </form>
                        <form onSubmit={handleSubmit(handleSignUp)} className="sign-up-form">
                            <h2 className="title">Sign up</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type="text" placeholder="username" {...register("usernameRegister")} required/>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-envelope"></i>
                                <input type="email" placeholder="Email" {...register("emailRegister")} required/>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" placeholder="password" {...register("passwordRegister")} required/>
                            </div>
                            <input type="submit" className="btn" value="Sign up"/>
                        </form>
                        
                    </div>
                </div>
                
                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>New Here ? </h3>
                            <p>please register to join us</p>
                            <button className="btn transparent" onClick={() => panel.current.classList.add("sign-up-mode")} id="sign-up-btn">Sign up</button>
                        </div>
                        <img src={LoginLog} className="image" alt="Login SVG"/>
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>One of use ? </h3>
                            <p>directly login to enter</p>
                            <button className="btn transparent" onClick={() => panel.current.classList.remove("sign-up-mode")} id="sign-in-btn">Sign in</button>
                        </div>
                        <img src={RegisterLog} className="image" alt="Register SVG"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Authentication
