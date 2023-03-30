import { useFormik } from "formik";
import React, { useContext } from "react";
import api from "../api/expenseList";
import { GlobalContext } from "../context/GlobalState";

function AddTransaction() {
	const [expenses, setExpenses] = useContext(GlobalContext);
	// const expenses = useContext(GlobalContext);

	// Get data with Formik
	let formik = useFormik({
		initialValues: {
			text: "",
			amount: "",
		},
		onSubmit: async (values, { resetForm }) => {
			try {
				if (values !== {}) {
					// Post inserted data to JSON API
					const response = await api.post("/expenses", values);

					// setExpenses new overall expenses
					const allExpenses = [...expenses, response.data];
					setExpenses(allExpenses);
					resetForm();
				} else {
					alert("add something");
				}
			} catch (error) {
				console.log("An error has occured " + error);
			}
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
						required
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
