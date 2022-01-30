import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

function IncomeExpense() {
	// Get usuage data
	// const expenses = useContext(GlobalContext);
	const [expenses, setExpenses] = useContext(GlobalContext);

	// Total Balance
	let amounts = [];
	for (let i = 0; i < expenses.length; i++) {
		amounts.push(expenses[i].amount);
	}

	// Seperate out income and expense
	const spend = amounts.filter((spent) => {
		return spent < 0;
	});
	const income = amounts.filter((spent) => {
		return spent > 0;
	});

	// total income
	const totalIncome = income.reduce((acc, item) => (acc += item), 0);
	const totalSpend = spend.reduce((acc, item) => (acc += item), 0);

	return (
		<>
			<div className="inc-exp-container">
				<div>
					<h4>Income</h4>
					<p id="money-plus" className="money plus">
						+${totalIncome}
					</p>
				</div>
				<div>
					<h4>Expense</h4>
					<p id="money-minus" className="money minus">
						-${Math.abs(totalSpend)}
					</p>
				</div>
			</div>
		</>
	);
}

export default IncomeExpense;
