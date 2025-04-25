import { NavLink, useNavigate } from "react-router";
import Button from "../components/Button";
import Input from "../components/Input";
import { FormEvent, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    console.log("Form Values:", formValues);

    //fetching api
    try {
      const response = await axios(`${BASE_URL}/auth/login`, {
        headers: {
          "label-Type": "application/json",
        },
        method: "POST",
        data: formValues,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/");
      toast.success("Welcome", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (errorMessage: any) {
      setErrorMessage(
        errorMessage.response?.data?.message || "Login failed, Please try again"
      );
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-700 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            name="username"
            type="text"
            id="username"
            label="Email or Mobile"
          />
          <Input
            name="password"
            type="password"
            id="password"
            label="Password"
          />
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
          <Button label="Login" type="submit" className="bg-blue-600" />
        </form>
        <p className="text-sm text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <NavLink to="/register" className="text-blue-600 hover:underline">
            Register here
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
