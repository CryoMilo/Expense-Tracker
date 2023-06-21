import api from "../api/expenseList";
import { useNavigate } from "react-router-dom";
import useExpenses from "./hooks/useExpenses";

function TransactionList({ setIsEdit }) {
	const navigate = useNavigate();
	const { expenses, reloadExpenses } = useExpenses();

	const goToEdit = (id) => {
		setIsEdit(true);
		navigate(`/expenses/${id}`);
	};

	async function deleteTransaction(id) {
		// Delete in JSON
		try {
			const response = await api.delete(`expenses/${id}`);
			reloadExpenses();
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
								${Math.abs(spent.amount)}
							</span>
							<button
								onClick={() => deleteTransaction(spent.id)}
								className="delete-btn">
								x
							</button>
							{/* <button onClick={() => goToEdit(spent.id)} className="delete-btn">
								%
							</button> */}
						</li>
					);
				})}
			</ul>
		</>
	);
}

export default TransactionList;
