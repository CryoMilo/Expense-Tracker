import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

function TransactionList() {
	const [transactions, setTransactions] = useContext(GlobalContext);
	console.log(transactions);

	return (
		<>
			<h3>History</h3>
			<ul id="list" className="list">
				{transactions.map((spent) => {
					return (
						<li className="minus" key={spent.id}>
							{spent.text} <span>-${spent.amount}</span>
							<button className="delete-btn">x</button>
						</li>
					);
				})}
			</ul>
		</>
	);
}

export default TransactionList;
