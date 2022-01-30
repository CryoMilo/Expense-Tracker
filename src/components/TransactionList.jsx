import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import api from "../api/expenseList";

function TransactionList() {
	// const expenses = useContext(GlobalContext);
	const [expenses, setExpenses] = useContext(GlobalContext);

	async function deleteTransaction(id) {
		// Delete Visually on Local machine
		const newExpenses = expenses.filter((single) => {
			return single.id !== id;
		});

		// Delete in JSON
		try {
			const response = await api.delete(`expenses/${id}`);
			if (response) {
				setExpenses(newExpenses);
			}
		} catch (error) {
			console.log("An error has occured " + error);
		}
	}

	return (
		<>
			<h3>History</h3>
			<ul id="list" className="list">
				{expenses.map((spent) => {
					return (
						<li className={spent.amount < 0 ? "minus" : "plus"} key={spent.id}>
							{spent.text}
							<span>
								{spent.amount < 0 ? "-" : "+"}${Math.abs(spent.amount)}
							</span>
							<button
								onClick={() => deleteTransaction(spent.id)}
								className="delete-btn">
								x
							</button>
						</li>
					);
				})}
			</ul>
		</>
	);
}

export default TransactionList;
