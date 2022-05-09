import React from "react";
import Form from "./Form";

function Post({ handleReply }) {
	return (
		<>
			<div className="post-container">
				<h3 className="post-title">New Post</h3>
				<Form type={"post"} handleReply={handleReply} />
			</div>
		</>
	);
}

export default Post;
