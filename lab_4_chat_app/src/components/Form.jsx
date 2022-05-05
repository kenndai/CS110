import React, { useState } from "react";

function Form() {
	const [formData, setFormData] = useState({
		name: "",
		textContent: "",
	});

	const { name, textContent } = formData;

	const onChange = e => {
		setFormData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = e => {
		e.preventDefault();
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
			</form>
		</>
	);
}

export default Form;
