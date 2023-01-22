import "./index.css";
import io from "socket.io-client";
import React, { useState } from 'react';
import Chat from "./Chat";
const socket =io.connect("http://localhost:3000");


function Chatlogin() {

  const [username,setUsername]=useState("");
  const [room,setRoom]=useState("");
  const [showchat,setShowchat]=useState("");

  const joinRoom=()=>{
    if(username !=="" && room !==""){
      socket.emit("join_room",room);
      setShowchat(true);
    };}


  return (
    <div>
      {!showchat?(
      <div className="join-App">

      <div className="join-box">
      
      <h3 className="join-title">CHAT WITH TEAM</h3>
      
      <div className="join-inp-box">
      
      <div className="join-inp">
      <input className="join-inp1" type="text" placeholder="User_Id" onChange={(event)=>{setUsername(event.target.value);}}/>
      </div>
      <div className="join-inp">
      <input className="join-inp1" type="text" placeholder="Room_Id" onChange={(event)=>{setRoom(event.target.value);}}/>
      </div>
      
      </div >
      
      <button className="join-button" onClick={joinRoom}>Join</button>
      
      </div>
      </div>)
      :
      (<Chat socket={socket} username={username} room={room}/>)}
    </div>
  );
}

export default Chatlogin;