import "./Chat.css";
import Reply from "./Reply";
import Votes from "./Votes";

function Chat(props) {
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
			<Reply />
			<Votes />
		</div>
	);
}

export default Chat;
