import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExpenseDetails from "./components/ExpenseDetails";
import { GlobalProvider } from "./context/GlobalState";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const [isLoggedIn, setLoggedIn] = useState(false);

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
							{isLoggedIn && <Route path="/expenses" element={<Home />} />}
							{isLoggedIn && (
								<Route path="/expenses/:id" element={<ExpenseDetails />} />
							)}
						</Routes>
					</div>
				</div>
			</BrowserRouter>
			<ToastContainer />
		</GlobalProvider>
	);
}

export default App;
