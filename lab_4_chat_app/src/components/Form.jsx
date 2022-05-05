import React, { useContext, useState } from "react";
import { PostContext } from "../contexts/PostContext";

function Form() {
	const [formData, setFormData] = useState({
		name: "",
		textContent: "",
	});
	const { posts, setPosts } = useContext(PostContext);

	const { name, textContent } = formData;

	const onChange = e => {
		setFormData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = e => {
		e.preventDefault();
		setPosts([...posts, formData]);
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
