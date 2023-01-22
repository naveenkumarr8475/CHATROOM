import React, { useEffect, useState } from 'react';

function Chat({socket,username,room}){
    const [currmsg,setCurrmsg]=useState("");
    const [msglist,setMsglist]=useState([]);

    const sendMessage=()=>{
        if(currmsg !==""){
            const messageData={
                room:room,
                author:username,
                message:currmsg,
                time:new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };
            socket.emit("send_message",messageData);
            setMsglist((list)=>[...list,messageData]);
            setCurrmsg("");
        }}

    useEffect(()=>{
        socket.on("recieve_message",(data)=>{
            console.log("recieved",data);
            setMsglist((list)=>[...list,data]);
        });
        return()=>{socket.off("recieve_message")}
    },[socket]);


    return(
    <div className='chat'>
    <div className='chat-section'>
    
    <div className="chat-header">
        <div className='chat-title'>
        <h1 id='chat-name'>{username}</h1>
        <h4 id='chat-room-id'>ROOM ID   :   {room}</h4>
        </div>
        <button className='chat-leave-button' type="button" onClick="window.location.reload()">Leave Chat</button>
    </div>
    
    <div className="chat-body">
        {msglist.map((messageContent)=>{
            return(
                <div className='chat-box' id={username===messageContent.author ? "you":"other"}>
                    <div className='chat-message'>
                        <p>{messageContent.message}</p>
                    </div>
                    <div className='chat-details'>
                        <div className='chat-time'>{messageContent.time}</div>
                        <div className='chat-author'>~{messageContent.author}</div>
                    </div>
                </div>
            )})}
    </div>
    
    <div className="chat-footer">
        <input className='chat-inp' type="text" value={currmsg} placeholder='Type something here' onChange={(event)=>{setCurrmsg(event.target.value);}} onKeyPress={(event)=>{event.key==="Enter" && sendMessage()}}></input>
        <button className='chat-send-button' onClick={sendMessage}></button>
        <button className='chat-add-button'></button>
        <button className='chat-flag-button'></button>
    </div>
    
    </div>
    </div>)
}

export default Chat;