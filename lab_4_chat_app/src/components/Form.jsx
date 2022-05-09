import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ThreadContext } from "../contexts/ThreadContext";

function Form({ type, handleReply }) {
	const [formData, setFormData] = useState({
		id: "",
		name: "",
		textContent: "",
	});
	const { id, name, textContent } = formData;

	const { threads, setThreads } = useContext(ThreadContext);

	const onChange = e => {
		setFormData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = e => {
		e.preventDefault();
		setFormData(prevState => ({ ...prevState, [id]: uuidv4() }));

		if (type === "post") {
			// adds a post as a thread causing the page to rerender
			setThreads([...threads, formData]);
			handleReply(formData);
		} else if (type === "reply") {
			handleReply(formData);
		}
	};

	return (
		<>
			<form className="post-form" onSubmit={onSubmit}>
				<input
					type="text"
					id="name"
					name="name"
					placeholder="name"
					value={name}
					onChange={onChange}
				/>
				<textarea
					id="textContent"
					name="textContent"
					value={textContent}
					placeholder="text content"
					onChange={onChange}
					rows={5}
				/>
				<div className="align-right">
					<button type="submit" className="submit-btn">
						Submit
					</button>
				</div>
			</form>
		</>
	);
}

export default Form;
