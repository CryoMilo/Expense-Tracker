import { useEffect, useState } from "react";
import api from "../api/expenseList";
import { useForm } from "react-hook-form";
import InputText from "./Inputs/InputText";
import InputSelect from "./Inputs/InputSelect";
import CurrencyInput from "./Inputs/CurrencyInput";
import { categoryList } from "./categoryList";
import { toast } from "react-toastify";

function AddTransaction({ onTransactionUpdate }) {
	const [userNames, setUserNames] = useState([]);

	const [selectedMethod, setSelectedMethod] = useState("");

	const convertToUserNames = (fetchedData) => {
		return fetchedData?.map((data) => ({
			label: data.name,
			value: data.name,
		}));
	};

	const getUsers = async () => {
		try {
			const response = await api.get("/user");

			// setExpenses new overall expenses
			setUserNames(convertToUserNames(response?.data));
		} catch (error) {
			console.log("An error has occured " + error);
		}
	};

	const addTransaction = async (values) => {
		try {
			if (values !== {}) {
				// Post inserted data to JSON API
				const response = await api.post("/expenses", values);
				response.status === 201 && onTransactionUpdate();
				toast("Expense Created!");
			}
		} catch (error) {
			console.log("An error has occured " + error);
		}
	};

	useEffect(() => {
		getUsers();
	}, []);

	const { handleSubmit, control, setValue } = useForm({
		defaultValues: {
			expenseName: "",
			amount: "",
			paymentMethod: "",
			category: "",
			currency: "",
			location: "",
		},
	});
	const onSubmit = (values) => addTransaction(values);

	const handlePaymentMethod = (method) => {
		setValue("paymentMethod", method);
		setSelectedMethod(method);
	};

	return (
		<>
			<h3>Add new transaction</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor="text">Transaction</label>
					<InputText control={control} name="expenseName" />
				</div>
				<div>
					<label htmlFor="text">Amount</label>
					<InputText
						type="number"
						control={control}
						name="amount"
						placeholder="Insert Amount"
					/>
				</div>
				<div>
					<label htmlFor="paymentMethod">Payment Method</label>
					<div className="selectionBtnWrapper">
						<div
							className={`selectionBtn ${
								selectedMethod === "Cash" ? "selected" : ""
							}`}
							onClick={() => handlePaymentMethod("Cash")}>
							Cash
						</div>
						<div
							className={`selectionBtn ${
								selectedMethod === "Card" ? "selected" : ""
							}`}
							onClick={() => handlePaymentMethod("Card")}>
							Card
						</div>
						<div
							className={`selectionBtn ${
								selectedMethod === "Bank" ? "selected" : ""
							}`}
							onClick={() => handlePaymentMethod("Bank")}>
							Bank
						</div>
					</div>
				</div>
				<div>
					<label htmlFor="category">Category</label>
					<InputSelect
						control={control}
						name="category"
						options={categoryList}
					/>
				</div>
				<div>
					<label htmlFor="category">Currency</label>
					<CurrencyInput control={control} name="currency" />
				</div>
				<div>
					<label htmlFor="location">Location</label>
					<InputText
						control={control}
						name="location"
						placeholder="Enter location..."
					/>
				</div>
				<div>
					<label htmlFor="category">Particiants</label>
					<InputSelect
						control={control}
						name="participant"
						options={userNames}
					/>
				</div>
				<button type="submit" className="btn">
					Add transaction
				</button>
			</form>
		</>
	);
}

export default AddTransaction;
