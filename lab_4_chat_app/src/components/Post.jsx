import React from "react";
import Form from "./Form";

function Post() {
	return (
		<>
			<div className="post-container">
				<h3 className="post-title">New Post</h3>
				<Form type={"post"} />
			</div>
		</>
	);
}

export default Post;
