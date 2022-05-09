import React, { useState } from "react";
import Form from "./Form";

function Reply({ handleReply }) {
	const [show, setShow] = useState(false);

	return (
		<div className="reply-container">
			<button className="reply-btn" onClick={() => setShow(!show)}>
				<i className="far fa-comment-alt"></i> Reply
			</button>
			<div className="post">
				{show ? (
					<Form type={"reply"} handleReply={handleReply} />
				) : null}
			</div>
		</div>
	);
}

export default Reply;
