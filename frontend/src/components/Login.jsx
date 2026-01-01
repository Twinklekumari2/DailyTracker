import React, { useState } from "react";
import { api } from "./../api";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  const [isSignUp, setIsSignUp] = useState("Login");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignupToggle = () => {
    setIsSignUp((prev) => (prev === "Signup" ? "Login" : "Signup"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isSignUp === "Signup" ? "/user/signup" : "/user/login";

      const res = await api.post(url, form, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials:true,
      });
      console.log(res.data);
      localStorage.setItem("token", res.data.token)
      navigate('/')
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex justify-center items-center backdrop-blur-3xl px-4">
      <div className="absolute top-5 left-5 w-40 h-40 sm:w-56 sm:h-56 bg-pink-200 rounded-full blur-3xl opacity-70 -z-10"></div>

      <div className="absolute top-1/3 left-1/4 hidden md:block w-64 h-64 bg-pink-300 rounded-full blur-3xl opacity-70 -z-10"></div>

      <div className="absolute top-10 right-10 hidden lg:block w-64 h-64 bg-pink-300 rounded-full blur-3xl opacity-70 -z-10"></div>

      <div className="absolute bottom-5 right-5 w-40 h-40 sm:w-56 sm:h-56 bg-pink-200 rounded-full blur-3xl opacity-70 -z-10"></div>

      <form
        onSubmit={handleSubmit}
        className="
          bg-pink-300/40
          backdrop-blur-2xl
          border border-white/30
          shadow-xl
          rounded-xl
          p-6 sm:p-8
          w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4
          min-h-105
          flex flex-col justify-center items-center
          space-y-6
          text-base sm:text-lg
        "
      >
        <h2 className="text-2xl font-bold">
          {isSignUp === "Signup" ? "Create Account" : "Welcome Back"}
        </h2>

        <div className="flex flex-col w-full items-center">
          <label htmlFor="userName" className="font-semibold self-start">
            Username
          </label>
          <input
            type="text"
            name="userName"
            id="userName"
            value={form.userName}
            onChange={handleChange}
            className="w-64 sm:w-72 border-b rounded-2xl outline-none py-2 px-3"
            required
          />
        </div>

        <div className="flex flex-col w-full items-center">
          <label htmlFor="password" className="font-semibold self-start">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            className="w-64 sm:w-72 border-b rounded-2xl outline-none py-2 px-3"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded-xl cursor-pointer hover:scale-105 transition"
        >
          {isSignUp === "Signup" ? "Signup" : "Login"}
        </button>

        <p className="text-sm">
          {isSignUp === "Signup"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <span
            onClick={handleSignupToggle}
            className="text-blue-600 cursor-pointer font-semibold"
          >
            Click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
