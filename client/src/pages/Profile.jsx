import React from "react";
import { useSelector } from "react-redux";
const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <div className=" p-3 mx-auto  max-w-lg">
      <h1 className="text-3xl font-semibold text-center">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.currentUser.photo}
          alt=" profile"
          className=" flex felx-col rounded-full h-24 w2-4 object-cover self-center "
        />
        <input
          type="text"
          placeholder=" username"
          className=" rounded-lg p-3 border"
          id="username"
        />
        <input
          type="email"
          placeholder=" email"
          className=" rounded-lg p-3 border"
          id="email"
        />
        <input
          type="password"
          placeholder=" password"
          className=" rounded-lg p-3 border"
          id="password"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:95 disable:opacity-95">
          update Profile
        </button>
      </form>
      <div className="text-red-700 cursor-pointer flex  justify-between py-5 ">
        <span>Delete account</span>
        <span>Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
