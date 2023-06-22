import api from "../api/expenseList";
import { useNavigate } from "react-router-dom";
import useExpenses from "./hooks/useExpenses";
import { useEffect } from "react";

function TransactionList({ isTransactionUpdated }) {
	const navigate = useNavigate();
	const { expenses, reloadExpenses } = useExpenses();

	useEffect(() => {
		if (isTransactionUpdated) {
			reloadExpenses();
		}
	}, [isTransactionUpdated, reloadExpenses]);

	async function deleteTransaction(id) {
		try {
			const response = await api.delete(`expenses/${id}`);
			response.status === 200 && reloadExpenses();
		} catch (error) {
			console.log("An error has occured " + error);
		}
	}

	const openDetails = (id) => {
		navigate(`/expenses/${id}`);
	};

	return (
		<>
			<h3>Transactions</h3>
			<ul id="list" className="list">
				{expenses?.map((spent) => {
					return (
						<li className="minus" key={spent.id}>
							{spent.expenseName}
							<span onClick={() => openDetails(spent.id)}>
								{spent.currency}
								{Math.abs(spent.amount)}
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
