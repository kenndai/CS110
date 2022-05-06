import React, { useState } from "react";
import Form from "./Form";

function Reply() {
	const [show, setShow] = useState(false);

	return (
		<div className="reply-container">
			<button className="reply-btn" onClick={() => setShow(!show)}>
				<i class="far fa-comment-alt"></i> Reply
			</button>
			<div className="post">{show ? <Form /> : null}</div>
		</div>
	);
}

export default Reply;
