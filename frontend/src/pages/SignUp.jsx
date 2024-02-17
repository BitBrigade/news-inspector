import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post("/api/auth/signup", formData, {
        withCredentials: true,
      });

      setError(false);
      setLoading(false);

      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.response ? error.response.data.message : error.message);
    }
  }

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
            disabled={loading}
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

        <OAuth />

        <div className="flex items-center gap-2 mt-5">
          <p className="text-sm">Already have an account? </p>
          <Link to="/sign-in">
            <p className="text-blue-600 underline">Sign In</p>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
