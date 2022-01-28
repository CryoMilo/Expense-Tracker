import { useFormik } from "formik";
import React from "react";

function AddTransaction() {
	let formik = useFormik({
		initialValues: {
			text: "",
			amount: "",
		},
		onSubmit: (values, { resetForm }) => {
			console.log(values);
			resetForm();
		},
	});

	return (
		<>
			<h3>Add new transaction</h3>
			<form id="form" onSubmit={formik.handleSubmit}>
				<div className="form-control">
					<label htmlFor="text">Text</label>
					<input
						type="text"
						value={formik.values.text}
						onChange={formik.handleChange}
						id="text"
						placeholder="Enter text..."
					/>
				</div>
				<div className="form-control">
					<label htmlFor="amount">
						Amount <br />
						(negative - expense, positive - income)
					</label>
					<input
						type="number"
						value={formik.values.amount}
						onChange={formik.handleChange}
						id="amount"
						placeholder="Enter amount..."
					/>
				</div>
				<button type="submit" className="btn">
					Add transaction
				</button>
			</form>
		</>
	);
}

export default AddTransaction;
