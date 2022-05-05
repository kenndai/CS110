import React from "react";
import Form from "./Form";

function Post() {
	return (
		<>
			<div className="post-container">
				<h3 className="post-title">New Post</h3>
				<div className="post">
					<Form />
				</div>
			</div>
		</>
	);
}

export default Post;
