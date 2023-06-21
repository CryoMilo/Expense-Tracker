import AddTransaction from "./AddTransaction";
import TransactionList from "./TransactionList";

const Home = ({ setIsEdit }) => {
	return (
		<div className="layout">
			<div className="container">
				<AddTransaction />
			</div>
			<div className="container">
				<TransactionList setIsEdit={setIsEdit} />
			</div>
		</div>
	);
};

export default Home;
