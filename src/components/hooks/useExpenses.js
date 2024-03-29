import { useEffect, useState } from "react";
import api from "../../api/expenseList";

const useExpenses = () => {
	const [expenses, setExpenses] = useState([]);

	const getTransactions = async () => {
		try {
			const response = await api.get("/expenses");
			setExpenses(response.data);
		} catch (error) {
			console.log("An error has occurred: " + error);
		}
	};

	useEffect(() => {
		getTransactions();
	}, []);

	const reloadExpenses = async () => {
		try {
			await getTransactions();
		} catch (error) {
			console.log("An error has occurred: " + error);
		}
	};

	return {
		expenses,
		reloadExpenses,
	};
};

export default useExpenses;
