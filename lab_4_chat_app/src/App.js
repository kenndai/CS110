import { useState, useMemo } from "react";
import "./App.css";
import Thread from "./components/Thread";
import { ThreadContext } from "./contexts/ThreadContext";

function App() {
	// Central "Post" form on top
	// useState for "Threads"
	const [threads, setThreads] = useState([]);
	const providerThreads = useMemo(
		() => ({ threads, setThreads }),
		[threads, setThreads]
	);

	return (
		<>
			<h3>Hi Please Post</h3>
			<ThreadContext.Provider value={providerThreads}>
				<Thread type={"first"} />
				{threads.length > 0
					? threads.map(thread => {
							return <Thread {...thread} />;
					  })
					: null}
			</ThreadContext.Provider>
		</>
	);
}

export default App;
