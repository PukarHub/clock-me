import React, {useRef, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase'

import {useAuth} from '../contexts/AuthContext'
import axios from 'axios';

const Chats = () => {
    const history = useHistory();
    
    const { user } = useAuth();
    console.log(user);
  
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        await auth.signOut();
        history.push('/')
    }

    // Handles the User Image
    const getFile = async(url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'})
    }

    useEffect(()=> {
        if(!user) {
            history.push('/');
            return;
        }  

        // Checks if there is existing user
        axios.get('https://api.chatengine.io/users/me/', {
            headers: {
                "project-id": "f4060c16-61d5-4ee0-a8e4-784b85b9ae31",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
        .then(() => {
            setLoading(false)
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name)

                    // Creates a new User
                    axios.post('https://api.chatengine.io/users', (
                        formdata,
                        {  
                            headers: {'PRIVATE-KEY' : "a1045f3f-323c-48bb-9889-52524f2c4f85"}
                        }
                        ))
                        .then(() => setLoading(false))
                        .catch((error) => console.log(error));
                    })
                })
            }, [user, history])
            

            // if(!user || loading) return 'Loading...'

    return (
        <div className="chats-page">
           <div className="nav-bar">
               <div className="logo-tab">
                   Clock-Me
               </div>
               <div onClick={handleLogout} className="logout-tab">
                   Logout
               </div>
           </div>
           <ChatEngine
                height="calc(100vh-66px)"
                projectID="f4060c16-61d5-4ee0-a8e4-784b85b9ae31"
                userName={user.email}
                userSecret={user.uid}
                />
        </div>
    );
}

export default Chats;
