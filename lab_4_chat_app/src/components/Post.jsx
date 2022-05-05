import React from "react";
import Form from "./Form";
import Vote from "./Votes";

function Post() {
	return (
		<>
			<div className="post-container">
				<h3 className="post-title">Post</h3>
				<div className="post">
					<Form />
					<Vote />
				</div>
				<div className="align-right">
					<button className="submit-btn">Submit</button>
				</div>
			</div>
		</>
	);
}

export default Post;
