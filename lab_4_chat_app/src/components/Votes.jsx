import React, { useState } from "react";
import './Votes.css'

function Vote() {
	const [votes, setVotes] = useState(0);

	return (
		<>
			<div className="voting">
				<button className="up" onClick={() => setVotes(votes + 1)} alt = "up arrow"> </button>
				<span>{votes}</span>
				<button className="down" onClick={() => setVotes(votes - 1)}> </button>
			</div>
		</>
	);
}

export default Vote;
