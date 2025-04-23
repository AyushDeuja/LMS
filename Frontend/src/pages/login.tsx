import { NavLink } from "react-router";
import Button from "../components/Button";
import Input from "../components/Input";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-700 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h1>
        <form className="space-y-4">
          <Input
            name="username"
            type="text"
            id="username"
            content="Email or Mobile"
          />
          <Input
            name="password"
            type="password"
            id="password"
            content="Password"
          />
          <Button content="Login" type="submit" bgColor="bg-blue-600" />
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
