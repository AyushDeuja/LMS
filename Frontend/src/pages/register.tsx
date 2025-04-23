import { NavLink } from "react-router";
import Button from "../components/Button";
import Input from "../components/Input";
import { FormEvent, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    console.log("Form Values:", formValues);

    //fetching api
    try {
      const response = await axios(`${BASE_URL}/auth/register`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        data: formValues,
      });
      localStorage.setItem("token", response.data.token);
      // console.log(response);
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || "Registration failed, Please try again"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-700 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Register
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input name="name" type="text" id="name" content="Name" />
          <Input name="email" type="email" id="email" content="Email" />
          <Input name="mobile" type="tel" id="mobile" content="mobile" />
          <Input
            name="password"
            type="password"
            id="password"
            content="Password"
          />
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
          <Button content="Register" type="submit" bgColor="bg-blue-600" />
        </form>
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-600 hover:underline">
            Log in
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
