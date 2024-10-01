import React from "react";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { app } from "../Firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../Redux/userSlice";

const OAuth = () => {
  const dispatch = useDispatch();
  const handleGoogleClik = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      console.log(res);
      const data = await res.json();

      dispatch(signInSuccess(data));
    } catch (error) {
      console.log("could not sign in with google");
    }
  };

  return (
    <button
      onClick={handleGoogleClik}
      type="button"
      className=" p-3 bg-red-700 text-white rounded-lg text-center uppercase hover:opacity-95"
    >
      sign in with google
    </button>
  );
};

export default OAuth;
