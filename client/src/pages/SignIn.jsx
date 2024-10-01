import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess, signInFail, signInStart } from "../Redux/userSlice";
import OAuth from "../components/OAuth";
//change the signup to signin
const SignIn = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { error, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      dispatch(signInStart());
      // we will not use this path always we can use proxy in vite.config.js
      const res = await fetch("/api/auth/signin", {
        //change the path to signin
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFail(data.message));
        return;
        // setLoading(false);
        // setError(data.message);
      }

      // setLoading(false);
      dispatch(signInSuccess(data));

      // setError(null);
      navigate("/"); //change the path to home

      // console.log(data);
    } catch (error) {
      dispatch(signInFail(error.message));
      // setError(error.message);
      // setLoading(false);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      {error && <p className="text-red-500 text-center">Invalid credetial</p>}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-lg mx-auto"
      >
        {/* <input  // remove this input field
          type="text"
          placeholder="username"
          className=" border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        /> */}

        <input
          type="email"
          placeholder="email"
          className=" border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className=" border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          // type="button"
          className="bg-slate-700 p-3 text-center uppercase text-white rounded-lg hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5 ">
        <p>Haven't an account ?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign-UP</span>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
