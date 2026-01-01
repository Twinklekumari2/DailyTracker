import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignUp, setSignup] = useState("Signup");
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    navigate("/");
  };

  const handleSignupToggle = () => {
    if (isSignUp === "Signup") {
      setSignup("Login");
    } else {
      setSignup("Signup");
    }
  };

  return (
    <div className=" relative backdrop-blur-3xl border-2 flex justify-center items-center h-screen">
      <div className="absolute top-5 left-5 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-70 -z-10"></div>
      <div className="absolute top-80 left-96 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-70 -z-10"></div>
      <form
        onSubmit={handleSubmit}
        className="bg-pink-300/40 p-6 rounded-xl w-1/4 h-1/2 text-xl space-y-4 flex flex-col justify-center items-center backdrop-blur-2xl border border-white/30 shadow-xl"
      >
        <div className="flex flex-col mb-6">
          <label htmlFor="userName" className=" font-semibold">
            Username:
          </label>
          <input
            type="text"
            name="userName"
            id="userName"
            value={form.userName}
            onChange={handleChange}
            className="border-b rounded-2xl outline-none py-1 px-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="font-semibold">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            className="border-b rounded-2xl outline-none py-1 px-2 "
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-xl cursor-pointer"
        >
          {isSignUp === "Signup" ? <p>Signup</p> : <p>Login</p>}
        </button>
        <p>
          Already have account?{" "}
          <span onClick={handleSignupToggle} className="text-blue-600 cursor-pointer">
            Click here
          </span>
        </p>
      </form>
      <div className="absolute top-5 right-96 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-70 -z-10"></div>
      <div className="absolute bottom-5 right-5 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-70 -z-10"></div>
    </div>
  );
};

export default Login;
