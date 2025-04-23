import { NavLink } from "react-router";
import Button from "../components/Button";
import Input from "../components/Input";
import { FormEvent } from "react";

const Register = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    console.log("Form Values:", formValues);
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
          <Input name="mobile" type="tel" id="mobile" content="Mobile" />
          <Input
            name="password"
            type="password"
            id="password"
            content="Password"
          />
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
