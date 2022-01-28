import "./App.css";
import AddTransaction from "./components/AddTransaction";
import Balance from "./components/Balance";
import Header from "./components/Header";
import IncomeExpense from "./components/IncomeExpense";
import TransactionList from "./components/TransactionList";

function App() {
	return (
		<div className="App">
			<Header />
			<div className="container">
				<Balance />
				<IncomeExpense />
				<TransactionList />
				<AddTransaction />
			</div>
		</div>
	);
}

export default App;
