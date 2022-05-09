import "./Chat.css";
import Reply from "./Reply";
import Votes from "./Votes";

function Chat({ name, textContent }) {
	return (
		<div className="Chat">
			Chat
			<div className="name">
				<b>{name}</b>{" "}
			</div>
			<div className="textContent">
				{" "}
				{textContent} <br />
			</div>
			<Reply />
			<Votes />
		</div>
	);
}

export default Chat;
