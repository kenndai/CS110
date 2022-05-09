import { useState, useMemo } from "react";
import Chat from "./Chat";
import Post from "./Post";
import { PostContext } from "../contexts/PostContext";

function Thread(props) {
	const [posts, setPosts] = useState([]);
	const providerPosts = useMemo(
		() => ({ posts, setPosts }),
		[posts, setPosts]
	);

	return (
		<>
			<div className="Thread">
				<PostContext.Provider value={providerPosts}>
					{props.type === "first" ? <Post /> : null}
					{posts.length > 0
						? posts.map(post => {
								return <Chat {...post} />;
						  })
						: null}
				</PostContext.Provider>
			</div>
		</>
	);
}

export default Thread;
