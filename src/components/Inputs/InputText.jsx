import { Controller } from "react-hook-form";

const InputText = ({ control, name, type, placeholder }) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<input
					type={type || "text"}
					placeholder={placeholder || "Enter item..."}
					{...field}
				/>
			)}
		/>
	);
};

export default InputText;
