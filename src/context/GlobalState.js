import { react, useState, useEffect, createContext } from "react";
import api from "../api/expenseList";

import React from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
	const [expenses, setExpenses] = useState([]);

	const getExpenses = async () => {
		const response = await api.get("/expenses");
		setExpenses(response.data);
	};

	useEffect(() => {
		getExpenses();
	}, []);

	return (
		<>
			<GlobalContext.Provider value={[expenses, setExpenses]}>
				{children}
			</GlobalContext.Provider>
		</>
	);
}
