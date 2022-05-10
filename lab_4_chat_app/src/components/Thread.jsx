import { useState, useMemo } from "react";
import Chat from "./Chat";
import Post from "./Post";
import { PostContext } from "../contexts/PostContext";
import "./Thread.css";

function Thread(props) {
	// every thread should have their own array of posts
	const [posts, setPosts] = useState([]);
	const providerPosts = useMemo(
		() => ({ posts, setPosts }),
		[posts, setPosts]
	);

	return (
		<div className="Thread">
			<h3>Thread</h3>
			{/* Display post for the first thread */}
			<PostContext.Provider value={providerPosts}>
				{Object.keys(props).length === 0 ? <Post /> : null}
				{/* Take the first post and make it into a chat*/}
				{Object.keys(props).length > 0 && posts.length === 0 ? (
					<Chat key={props.id} {...props} />
				) : null}
				{/* Loop through each Thread's array of posts and render them as Chats */}
				{Object.keys(props).length > 0 && posts.length > 0
					? posts.map(post => {
							return <Chat key={post.id} {...post} />
					})
					: null}
			</PostContext.Provider>
		</div>
	);
}

export default Thread;
