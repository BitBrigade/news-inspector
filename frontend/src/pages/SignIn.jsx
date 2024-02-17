import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserFailure,
} from "../redux/userSlice";
import OAuth from "../components/OAuth";

const LogIn = () => {
  const [formData, setFormData] = useState({});
  const [checked, setChecked] = useState(false);

  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signInFailure(""));
  }, [dispatch]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const res = await axios.post(
        "/api/auth/signin",
        { ...formData, remember: checked },
        { withCredentials: true }
      );

      const data = res.data;

      dispatch(signInSuccess(data));

      navigate("/dashboard/create");
    } catch (error) {
      error.message = error.response
        ? error.response.data.message
        : error.response.statusText;
      dispatch(updateUserFailure(error.message));
    }
  }

  function checkboxToggle() {
    setChecked(!checked);
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
            className="relative rounded-md inline-block py-3 font-medium group">
            <span className="absolute rounded-md inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1.5 translate-y-1.5 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute rounded-md inset-0 w-full h-full bg-teal-300 border-2 border-black group-hover:bg-teal-400"></span>
            <span className="relative rounded-md text-black">Sign In</span>
          </button>
          <div className="flex">
            <input id="check" type="checkbox" onChange={checkboxToggle} />
            <p className="text-slate-200 p-2">Remember me</p>
          </div>
          <p className="text-red-500">
            {error ? error || "Something went wrong!" : ""}
          </p>
        </form>
        <hr />

        <OAuth />

        <div className="flex items-center gap-2 mt-5">
          <p className="text-sm">New here? </p>
          <Link to="/sign-up">
            <p className="text-blue-600 underline">Sign Up</p>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LogIn;
