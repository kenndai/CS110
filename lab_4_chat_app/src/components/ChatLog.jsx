import React from "react";
import Chat from "./Chat";
import './ChatLog.css'
import { useContext } from "react";
import { PostContext } from "../contexts/PostContext";
import Vote from "./Votes";

function ChatLog() {
	const{posts,setPosts} = useContext(PostContext);
	console.log(posts);
	return (
		<>
			<div className = "chatLog">
				<h3>Chatlog</h3>{/* <div><Chat></Chat></div> */}
				<div className = "Chat">
					{posts.map(item =>{
						return (<div className = "chatContainer">
							<Chat{...item}/> 
							<Vote />
							</div>);
						// , <Vote />);
					})}
				</div>
				<div className="Vote">
				</div>
			</div>
		</>
	);
}

export default ChatLog;
