import { useState } from "react";
import Chat from "./Chat";
import Post from "./Post";

function Thread(props) {
	// every thread should have their own array of posts
	const [posts, setPosts] = useState([]);

	const handleReply = formData => {
		setPosts([...posts, formData]);
	};

	console.log(props);

	return (
		<div className="Thread">
			<h3>Thread</h3>
			{/* Display post for the first thread */}
			{Object.keys(props).length === 0 ? (
				<Post handleReply={handleReply} />
			) : null}
			{/* Only render Chats for threads that aren't the first */}
			{Object.keys(props).length > 0 && posts.length === 0 ? (
				<Chat {...props} />
			) : null}
			{Object.keys(props).length > 0 && posts.length > 0
				? posts.map(post => {
						return (
							<Chat
								key={post.id}
								{...post}
								handleReply={handleReply}
							/>
						);
				  })
				: null}
		</div>
	);
}

export default Thread;
