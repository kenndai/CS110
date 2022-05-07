import React from "react";
import Chat from "./Chat";
import { useContext } from "react";
import { PostContext } from "../contexts/PostContext";
function ChatLog() {
	const{posts,setPosts} = useContext(PostContext);
	console.log(posts);
	return (
		<>
			<div className = "ChatLog">
				<h3>Chatlog</h3>{/* <div><Chat></Chat></div> */}
				<div className = "Chat">
					{posts.map(item=>{
						return <Chat{...item}/>;
					})}
				</div>
			</div>
		</>
	);
}

export default ChatLog;
