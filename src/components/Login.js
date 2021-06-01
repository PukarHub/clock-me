import React from 'react'
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons'
import "firebase/app";
import Logo from '../logo.png'
import {auth} from '../firebase';
import firebase from 'firebase/app';
import { Button } from '@material-ui/core'
import './Login.css'

const Login = () => {
    const google = () => {
        auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    }

    const facebook = () => {
        auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    }
    return (

        <div className="login">
            <div className="login__container">
                <img src={Logo} alt="Clock me"/>
                <div className="login__text">
                  <h1>Sign in to Clock Me</h1>
                </div>  
             <Button onClick={google}> <GoogleOutlined style={{ padding: "8px" }} /> Sign In With Google</Button> <br /> 
             <Button onClick={facebook}> <FacebookOutlined style={{ padding: "8px" }} /> Sign In With Facebook</Button>
            </div>
        </div>
    )
}

export default Login