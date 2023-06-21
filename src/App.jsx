import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ExpenseDetails from "./components/ExpenseDetails";
import { GlobalProvider } from "./context/GlobalState";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import { useState } from "react";
import AddTransaction from "./components/AddTransaction";

function App() {
	const [isLoggedIn, setLoggedIn] = useState();
	const [isEdit, setIsEdit] = useState(false);

	return (
		<GlobalProvider>
			<BrowserRouter>
				<div className="App">
					{/* <Header /> */}
					<div className="layout">
						<Routes>
							<Route
								path="/"
								element={
									<Login isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
								}
							/>
							<Route
								path="/expenses"
								element={<Home setIsEdit={setIsEdit} />}
							/>
							<Route path="/expenses/:id" element={<ExpenseDetails />} />
						</Routes>
					</div>
				</div>
			</BrowserRouter>
		</GlobalProvider>
	);
}

export default App;
