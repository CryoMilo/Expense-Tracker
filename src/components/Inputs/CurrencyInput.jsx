import { Controller } from "react-hook-form";

const CurrencyInput = ({ control, name }) => {
	const currencyOptions = [
		{ label: "$", value: "USD" },
		{ label: "€", value: "EUR" },
		{ label: "£", value: "GBP" },
		{ label: "¥", value: "JPY" },
		{ label: "₹", value: "INR" },
	];

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<div className="currency-input">
					<span className="currency-symbol">
						<select
							{...field}
							className="currency-select"
							defaultValue={currencyOptions[0].value}>
							{currencyOptions.map((option) => (
								<option key={option.value} value={option.label}>
									{option.label}
								</option>
							))}
						</select>
					</span>
				</div>
			)}
		/>
	);
};

export default CurrencyInput;
