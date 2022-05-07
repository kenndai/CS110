import React from "react";
// import App from '../App'
// import { useState, useMemo } from "react";
import './Chat.css'

function Chat({name, textContent}) {
	return (<div>
		Chat
				<div className = "name"><b>{name}</b> </div> 
				<div className = "textContent"> {textContent} <br/></div>
		</div>)
}

export default Chat;
