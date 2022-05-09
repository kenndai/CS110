import "./Chat.css";
import Reply from "./Reply";
import Votes from "./Votes";

function Chat(props) {
	console.log("Chat");
	console.log(props.name, props.textContent);
	return (
		<div className="Chat">
			Chat
			<div className="name">
				<b>{props.name}</b>{" "}
			</div>
			<div className="textContent">
				{" "}
				{props.textContent} <br />
			</div>
			<Reply handleReply={props.handleReply} />
			<Votes />
		</div>
	);
}

export default Chat;
