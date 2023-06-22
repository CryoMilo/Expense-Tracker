import { useState } from "react";
import AddTransaction from "./AddTransaction";
import TransactionList from "./TransactionList";

const Home = () => {
	const [isTransactionUpdated, setTransactionUpdated] = useState(false);

	const handleTransactionUpdate = () => {
		setTransactionUpdated(true);
	};

	return (
		<div className="layout">
			<div className="container">
				<AddTransaction onTransactionUpdate={handleTransactionUpdate} />
			</div>
			<div className="container">
				<TransactionList isTransactionUpdated={isTransactionUpdated} />
			</div>
		</div>
	);
};

export default Home;
