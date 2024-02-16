import { useState } from "react";
import { app } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "@firebase/auth";
import axios from "axios";

const SignUp = () => {
	const [formData, setFormData] = useState({});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	function handleChange(e) {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	}

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setLoading(true);
			console.log(formData);
			const res = await axios.post(
				"/api/auth/signup",
				formData,
				{ withCredentials: true },
			);
			console.log(res.status);
			setError(false);
			setLoading(false);
			if (window && res.status == 201) {
				window.location.href = "/home";
			}
		} catch (error) {
			setLoading(false);
			setError(error.response ? error.response.data.message : error.message);
		}
	}

	async function handleGoogleClick() {
		try {
			setLoading(true);
			const provider = new GoogleAuthProvider();
			const auth = getAuth(app);
			const result = await signInWithPopup(auth, provider);
			const requestBody = {
				name: result.user.displayName,
				email: result.user.email,
				photo: result.user.photoURL,
			};
			const response = await axios.post(
				"/api/auth/google",
				requestBody,
			);
			const data = response.data;
			if (window && data) {
				window.location.href = "/home";
			}
		} catch (error) {
			console.log("Failed to login with Google.", error.message);
		} finally {
			setLoading(false);
		}
	}

	// bg-[#2e3440] bg-[#333333] bg-[#001220]

	return (
		<main className="p-2 bg-[#001220] bg-[url('/layered-waves-haikei.svg')] text-gray-50 bg-cover bg-center md:p-0 h-screen flex flex-col md:flex-row md:justify-around justify-center items-center">
			<div className="left drop-shadow-md shadow-gray-300 p-0.5">
				<h1 className="text-4xl font-semibold">News Inspector</h1>
				<p>tagline...</p>
			</div>
			<div className="form w-full md:w-1/3">
				<form className="flex flex-col gap-2">
					<input
						className="border-b border-gray-400 bg-transparent focus:outline-none p-1"
						type="text"
						id="username"
						onChange={handleChange}
						required
						placeholder="username..."
					/>
					<input
						className="border-b border-gray-400 bg-transparent focus:outline-none p-1"
						type="email"
						id="email"
						onChange={handleChange}
						required
						placeholder="email..."
					/>
					<input
						className="border-b border-gray-400 bg-transparent focus:outline-none p-1"
						type="password"
						id="password"
						onChange={handleChange}
						required
						placeholder="password..."
					/>
					<button
						type="submit"
						onClick={handleSubmit}
						className="relative rounded-md inline-block py-3 font-medium group"
					>
						<span className="absolute rounded-md inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1.5 translate-y-1.5 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
						<span className="absolute rounded-md inset-0 w-full h-full bg-teal-300 border-2 border-black group-hover:bg-teal-400"></span>
						<span className="relative rounded-md text-black">Sign Up</span>
					</button>
					<p className="text-red-500">
						{error ? error || "Signup failed" : ""}
					</p>
				</form>
				<hr className="mt-4" />
				<div className="flex justify-around gap-2 mt-2">
					<button
						type="button"
						onClick={handleGoogleClick}
						className="w-full flex items-center justify-center p-2 px-4 gap-2 border border-gray-400 rounded-full cursor-pointer hover:shadow-md hover:shadow-gray-700 transition"
					>
						{loading ? (
							<div className="flex items-center justify-center gap-4">
								<img
									alt="loader"
									src="/loader-dark.svg"
									className="animate-spin w-4 h-4"
								/>
								<span>Loading...</span>
							</div>
						) : (
							<div className="flex gap-2 items-center justify-center">
								<img width={20} src="/google.svg" alt="google" />
								<span>Continue with Google</span>
							</div>
						)}
					</button>
				</div>
				<p className="mt-2 text-sm">
					Already have an account?{" "}
					<a className="text-blue-600 underline" href="/sign-in">
						Sign in
					</a>
				</p>
			</div>
		</main>
	);
};

export default SignUp;
