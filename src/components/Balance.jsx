import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

function Balance() {
	// const expenses = useContext(GlobalContext);
	const [expenses, setExpenses] = useContext(GlobalContext);

	console.log(expenses);

	let amounts = [];
	for (let i = 0; i < expenses.length; i++) {
		amounts.push(expenses[i].amount);
	}
	console.log(amounts);

	const total = amounts.reduce((acc, item) => {
		return (acc += item);
	}, 0);
	return (
		<>
			<h4>Your Balance</h4>
			<h1 id="balance" className={total < 0 ? "debt" : null}>
				${total}
			</h1>
		</>
	);
}

export default Balance;
