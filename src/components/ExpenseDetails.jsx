import { useContext, useEffect, useState } from "react";
import api from "../api/expenseList";
import { GlobalContext } from "../context/GlobalState";
import { useForm } from "react-hook-form";
import InputText from "./Inputs/InputText";
import InputSelect from "./Inputs/InputSelect";
import CurrencyInput from "./Inputs/CurrencyInput";
import { useNavigate, useParams } from "react-router-dom";

const categoryList = [
	{
		label: "Education",
		value: "Education",
	},
	{
		label: "Grocery",
		value: "Grocery",
	},
	{
		label: "Shopping",
		value: "Shopping",
	},
];

function ExpenseDetails({ isEdit }) {
	const [singleExpense, setSingleExpense] = useState([]);
	const [userNames, setUserNames] = useState([]);

	const navigate = useNavigate();

	const { id } = useParams();

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

	const updateTransaction = async (values) => {
		try {
			if (values !== {}) {
				// Put updated data to the JSON API
				const response = await api.put(`/expenses/${values.id}`, values);
				response.status === 200 && navigate(`/expenses`);
			}
		} catch (error) {
			console.log("An error has occurred: " + error);
		}
	};

	useEffect(() => {
		getUsers();
		getSingleExpense();
	}, []);

	const { handleSubmit, control, setValue, reset } = useForm({
		defaultValues: singleExpense,
	});
	const onSubmit = (values) => updateTransaction(values);

	const getSingleExpense = async () => {
		try {
			const response = await api.get(`/expenses/${id}`);
			if (response?.data) {
				reset({ ...response.data });
				setSingleExpense(response.data);
			}
		} catch (error) {
			console.log("An error has occurred: " + error);
		}
	};

	const handlePaymentMethod = (method) => {
		setValue("paymentMethod", method);
		setSelectedMethod(method);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor="text">Transcation</label>
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
					Edit
				</button>
			</form>
		</>
	);
}

export default ExpenseDetails;
