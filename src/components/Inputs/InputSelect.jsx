import { Controller } from "react-hook-form";

const InputSelect = ({ control, name, options }) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<select className="select-box" {...field}>
					<option key="" value="">
						select {name}
					</option>
					{options?.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			)}
		/>
	);
};

export default InputSelect;
