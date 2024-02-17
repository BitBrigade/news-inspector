import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { app } from "../firebase";
import {
  ref,
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/userSlice";

function EditUser() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(undefined);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [imageError, setImageError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);

  useEffect(() => {
    dispatch(updateUserFailure(null));

    return () => {
      dispatch(updateUserFailure(null));
    };
  }, []);

  async function handleImageUpload(image) {
    const storage = getStorage(app);
    const imageName = new Date().getTime() + image.name;
    const storageRef = ref(storage, imageName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  }

  async function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      dispatch(updateUserStart());

      const res = await axios.post(`/api/user/${currentUser._id}`, formData, {
        withCredentials: true,
      });
      const data = res.data;

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      navigate("/dashboard");
    } catch (error) {
      error.message = error.response.data
        ? error.response.data.message
        : error.response.statusText;
      dispatch(updateUserFailure(error.message));
      setUpdateSuccess(false);
    }
  }

  return (
    <div className="p-3 w-1/3 mx-auto mt-16">
      <h1 className="text-4xl text-center font-semibold p-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-50 to-gray-100">
        Profile
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profile"
          onClick={() => fileRef.current.click()}
          className="h-24 w-24 self-center cursor-pointer rounded-full mt-2"
        />
        <span className="text-sm font-medium text-sky-100 opacity-60 self-center">
          Image size must be under 2MB
        </span>

        <p className="text-sm font-medium self-center">
          {imageError ? (
            <span className="text-sm font-medium text-red-500">
              Error while uploading image!
            </span>
          ) : imageUploadProgress > 0 && imageUploadProgress < 100 ? (
            <span className="text-sm font-medium text-slate-500">{`Uploading: ${imageUploadProgress}%`}</span>
          ) : imageUploadProgress === 100 ? (
            <span className="text-green-500">Image uploaded successfully!</span>
          ) : (
            ""
          )}
        </p>

        <input
          defaultValue={
            currentUser.data ? currentUser.data.username : currentUser.username
          }
          type="text"
          id="username"
          placeholder="Username"
          onChange={handleChange}
          className="bg-slate-200 p-3 rounded-lg outline-none focus:outline-violet-500"
        />
        <input
          defaultValue={
            currentUser.data ? currentUser.data.email : currentUser.email
          }
          type="text"
          id="email"
          placeholder="Email"
          onChange={handleChange}
          className="bg-slate-200 p-3 rounded-lg outline-none focus:outline-violet-500"
        />
        <input
          type="text"
          id="password"
          placeholder="Password"
          onChange={handleChange}
          className="bg-slate-200 p-3 rounded-lg outline-none focus:outline-violet-500"
        />

        <button
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-500 border border-gray-50/50 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? (
            <div className="flex items-center justify-center gap-4">
              <img
                alt="loader"
                src="/loader-dark.png"
                className="animate-spin w-4 h-4"
              />
              <span>Loading...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <span>Update</span>
            </div>
          )}
        </button>
      </form>

      <p className="text-red-500 mt-2">
        {error ? error || "Something went wrong!" : ""}
      </p>
      <p className="text-green-500 mt-2">
        {updateSuccess && "Profile updated successfully!"}
      </p>
    </div>
  );
}

export default EditUser;
