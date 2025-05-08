import { NavLink, useNavigate } from "react-router";
import Button from "../components/Button";
import Input from "../components/Input";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../utils/axiosInterceptor";
import { object, string } from "yup";

let registerSchema = object({
  name: string().required(),
  email: string().required(),
  mobile: string().required(),
  password: string().required("Password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    //fetching api
    try {
      const values = await registerSchema.validate(formValues);
      console.log(values);
      const response = await axiosInstance(`/auth/register`, {
        method: "POST",
        data: values,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/");
      toast.success("Welcome");
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || "Registration failed, Please try again"
      );
      toast.error("Registration failed, Please try again");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-700 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Register
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input name="name" type="text" id="name" label="Name" />
          <Input name="email" type="email" id="email" label="Email" />
          <Input name="mobile" type="tel" id="mobile" label="mobile" />
          <Input
            name="password"
            type="password"
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
