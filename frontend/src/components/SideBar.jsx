import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from "../redux/userSlice";
import axios from "axios";

export default function SideBar() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSignout() {
    try {
      await axios.post(`/api/auth/signout`);
      dispatch(signOut());
      navigate("/sign-in");
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleDeleteAccount() {
    try {
      dispatch(deleteUserStart());
      await axios.delete(`/api/user/${currentUser._id}`, {
        withCredentials: true,
      });
      dispatch(deleteUserSuccess());
      navigate("/sign-up");
    } catch (error) {
      error.message = error.response.data
        ? error.response.data.message
        : error.response.statusText;
      dispatch(deleteUserFailure(error.message));
    }
  }

  return (
    <main className="flex bg-[#0f0f0f] text-gray-50">
      <div className="bg-[#001220] rounded-r-2xl flex justify-center items-center shadow font-mono h-screen w-72">
        <div className="flex flex-col w-full p-3 gap-3">
          <img
            src={
              currentUser.data
                ? currentUser.data.profilePicture
                : currentUser.profilePicture
            }
            className="cursor-pointer rounded-full  self-center"
            alt="user"
            width={150}
            height={10}
          />

          <div className="info flex flex-col">
            <h1 className="text-center">{currentUser.username}</h1>
          </div>
          <div className="btns1 flex gap-2">
            <a href="/dashboard/edituser">
              <button className="bg-blue-500 hover:bg-blue-600 w-full p-1 rounded">
                Edit
              </button>
            </a>
            <button
              onClick={handleSignout}
              className="bg-red-400 hover:bg-red-500 w-full p-1 rounded">
              Sign out
            </button>
          </div>
          <div className="btns2 flex flex-col gap-2">
            <a href="/dashboard/create">
              <button className="bg-indigo-500 hover:bg-indigo-600 w-full p-1 rounded">
                + Create
              </button>
            </a>
            <button
              onClick={handleDeleteAccount}
              className="bg-red-500 hover:bg-red-600 self-end w-full p-1 rounded">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
