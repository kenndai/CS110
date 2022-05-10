import { useState, useMemo } from "react";
import "./App.css";
import Thread from "./components/Thread";
import { ThreadContext } from "./contexts/ThreadContext";

function App() {
	const [threads, setThreads] = useState([{}]);
	const providerThreads = useMemo(
		() => ({ threads, setThreads }),
		[threads, setThreads]
	);

	return (
		<>
			{/* <h3>Hi Please Post</h3> */}
			<ThreadContext.Provider value={providerThreads}>
				{threads.map(thread => (
					<Thread key={thread.id} {...thread} />
				))}
			</ThreadContext.Provider>
		</>
	);
}

export default App;
