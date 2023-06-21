import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

function Balance() {
	// const expenses = useState([]);
	const [expenses, setExpenses] = useState([]);

	let amounts = [];
	for (let i = 0; i < expenses.length; i++) {
		amounts.push(expenses[i].amount);
	}

	const total = amounts.reduce((acc, item) => {
		return (acc += item);
	}, 0);
	return (
		<div className="balanceLayout">
			<h4>Your Balance</h4>
			<h2 id="balance" className={total < 0 ? "debt" : null}>
				${total}
			</h2>
		</div>
	);
}

export default Balance;
