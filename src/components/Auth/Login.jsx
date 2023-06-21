import { useEffect, useState } from "react";
import "./login.css";
import api from "../../api/expenseList";
import { useForm } from "react-hook-form";

const Login = () => {
	const [users, setUsers] = useState([]);
	const getUsers = async () => {
		const response = await api.get("/user");
		setUsers(response.data);
	};

	useEffect(() => {
		getUsers();
	}, []);

	const { register, handleSubmit } = useForm();
	const onSubmit = (data) => {
		const userExists = checkUserData(data);
		if (userExists) {
			console.log("Login successful");
		} else {
			console.log("Invalid credentials");
		}
	};

	const checkUserData = (data) => {
		return users.some(
			(user) => user.email === data.email && user.password === data.password
		);
	};

	return (
		<form className="form" onSubmit={handleSubmit(onSubmit)}>
			<p className="form-title">Sign in to your account</p>
			<div className="input-container">
				<input type="email" {...register("email")} placeholder="Enter email" />
				<span></span>
			</div>
			<div className="input-container">
				<input
					type="password"
					{...register("password")}
					placeholder="Enter password"
				/>
			</div>
			<button type="submit" className="submit">
				Sign in
			</button>
		</form>
	);
};

export default Login;
