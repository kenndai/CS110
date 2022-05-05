import { useState, useMemo } from "react";
import "./App.css";
import Post from "./components/Post";
import Reply from "./components/Reply";
import { PostContext } from "./contexts/PostContext";

function App() {
	const [posts, setPosts] = useState([]);
	const providerPosts = useMemo(
		() => ({ posts, setPosts }),
		[posts, setPosts]
	);

	return (
		<>
			<h3>Hi Please Vote</h3>
			<PostContext.Provider value={providerPosts}>
				<Post />
				<Reply />
			</PostContext.Provider>
			<ul>
				{posts.map(post => (
					<li>{`${post.name}: ${post.textContent}`}</li>
				))}
			</ul>
		</>
	);
}

export default App;
