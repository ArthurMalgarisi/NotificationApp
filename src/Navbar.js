import React, { useEffect, useState } from 'react'
import Notification from "./notification.png"
import Settings from "./settings.png"
import Message from "./email.png"

const Navbar = ({ socket }) => {

const[notifications, setNotifications] = useState([]);
const[open, setOpen] = useState(false);

useEffect(() => {
    socket.on("getNotification", (data) => {
        setNotifications((prev) => [...prev, data]);
    });
},[socket]);

console.log(notifications);

const displayNotification = ({senderName , type}) => {
    let action;
    if(type === 1){
        action = "liked"
    }
    else if(type === 2){
        action = "commented"
    }
    else{
        action = "shared"
    }
    return(
        <span className='notification'>{`${senderName} ${action} your post`}</span>
    )
}

  return (
    <div className='navbar'>
        <span className='logo'>Notifications App</span>
        <div className='icons' onClick={() => setOpen(!open)}>
            <div className='icon'>
                <img className='iconImg' src={Notification} alt="" />
                <div className='counter'>{notifications.length}</div>
            </div>
            <div className='icon'>
                <img className='iconImg' src={Message} alt="" />
                <div className='counter'>{notifications.length}</div>
            </div>
            <div className='icon'>
                <img className='iconImg' src={Settings} alt="" />
                <div className='counter'>{notifications.length}</div>
            </div>
        </div>
        {open && 
            <div className='notification'>
            {notifications.map((n) => displayNotification(n))}
        </div>
        }
    </div>
  )
}

export default Navbar