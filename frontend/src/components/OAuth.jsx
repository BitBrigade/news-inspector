import { GoogleAuthProvider, signInWithPopup, getAuth } from "@firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";

import { signInSuccess } from "../redux/userSlice.js";

function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

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

      const response = await axios.post("/api/auth/google", requestBody);
      const data = response.data;

      navigate("/dashboard/create");
    } catch (error) {
      console.log("Failed to login with Google.", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-around gap-2 mt-2">
      <button
        type="button"
        onClick={handleGoogleClick}
        className="w-full flex items-center justify-center p-2 px-4 gap-2 border border-gray-400 rounded-full cursor-pointer hover:shadow-md hover:shadow-gray-700 transition">
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
  );
}

export default OAuth;
