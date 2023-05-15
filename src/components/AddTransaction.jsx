import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import api from "../api/expenseList";
import { GlobalContext } from "../context/GlobalState";

function AddTransaction() {
	const [expenses, setExpenses] = useContext(GlobalContext);
	// const expenses = useContext(GlobalContext);

	const [selectedCurrency, setSelectedCurrency] = useState("");

	const handleCurrencySelect = (currency) => {
		setSelectedCurrency(currency);
	};

	// Get data with Formik
	let formik = useFormik({
		initialValues: {
			text: "",
			amount: "",
			currency: "",
			category: "",
		},
		onSubmit: async (values, { resetForm }) => {
			try {
				if (values === "") {
					// Post inserted data to JSON API
					const response = await api.post("/expenses", values);

					// setExpenses new overall expenses
					const allExpenses = [...expenses, response.data];
					setExpenses(allExpenses);
					resetForm();
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
					<label htmlFor="text">Item</label>
					<input
						type="text"
						value={formik.values.text}
						onChange={formik.handleChange}
						id="text"
						placeholder="Enter item..."
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
				<div className="form-control">
					<label htmlFor="currency">Currency</label>
					<div className="currencyBtnWrapper">
						<button
							className={`currencyBtn ${
								selectedCurrency === "$" ? "selected" : ""
							}`}
							onClick={() => handleCurrencySelect("$")}>
							$
						</button>
						<button
							className={`currencyBtn ${
								selectedCurrency === "฿" ? "selected" : ""
							}`}
							onClick={() => handleCurrencySelect("฿")}>
							฿
						</button>
						<button
							className={`currencyBtn ${
								selectedCurrency === "₹" ? "selected" : ""
							}`}
							onClick={() => handleCurrencySelect("₹")}>
							₹
						</button>
					</div>
				</div>
				<div className="form-control">
					<label htmlFor="category">Category</label>
					<input
						type="text"
						value={formik.values.category}
						onChange={formik.handleChange}
						id="category"
						placeholder="Enter category..."
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
