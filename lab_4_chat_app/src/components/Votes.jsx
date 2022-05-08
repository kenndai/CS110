import React, { useState } from "react";
import './Votes.css'

function Vote() {
	const [votes, setVotes] = useState(0);

	return (
		<>
			<div className="voting">
				<button className="arrows" onClick={() => setVotes(votes + 1)}>
					&uarr;
				</button>
				<span>{votes}</span>
				<button className="arrows" onClick={() => setVotes(votes - 1)}>
					&darr;
				</button>
			</div>
		</>
	);
}

export default Vote;
