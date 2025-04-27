import { NavLink, useNavigate } from "react-router";
import Button from "../components/Button";
import Input from "../components/Input";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../utils/axiosInterceptor";

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    //fetching api
    try {
      const response = await axiosInstance(`/auth/register`, {
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
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || "Registration failed, Please try again"
      );
      toast.error("Registration failed, Please try again", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-700 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Register
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            name="name"
            type="text"
            id="name"
            label="Name"
            required={true}
          />
          <Input
            name="email"
            type="email"
            id="email"
            label="Email"
            required={true}
          />
          <Input
            name="mobile"
            type="tel"
            id="mobile"
            label="mobile"
            required={true}
          />
          <Input
            name="password"
            type="password"
            required={true}
            id="password"
            label="Password"
          />
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
          <Button label="Register" type="submit" />
        </form>
        <p className="text-md text-center text-gray-800 mt-6">
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
