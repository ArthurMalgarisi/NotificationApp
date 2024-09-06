import React, { useEffect } from 'react'
import { useState } from 'react'
import Navbar from './Navbar';
import Card from './Card';
import  { post }  from "./Data";
import { io } from "socket.io-client";

const Main = () => {

    const[username, setUsername] = useState("");
    const[user, setUser] = useState("");
    const[socket, setSocket] = useState(null); 
    
    useEffect(() => {
      setSocket(io("http://localhost:5000"));
    },[])

    useEffect(() => {
      socket?.emit("newUser", user);
    },[socket, user]);

  return (
    <div className='main'>
      {user ? (
        <>
          <Navbar socket={socket} />
          {post.map((post) => (
            <Card key={post.id} post={post} socket={socket} user={user} />
          ))}
          <span className='username'>{user}</span>
        </>
      ) : (
      <div className='login'>
        <input type = 'text' placeholder='username' onChange={(e) => setUsername(e.target.value)} />
        <button onClick={() => setUser(username)}>Login</button>
      </div>
  )}
    </div>
  );
};

export default Main