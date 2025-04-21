import Button from "../components/Button";
import Input from "../components/Input";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Register
        </h1>
        <form className="space-y-4">
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
      </div>
    </div>
  );
};

export default Register;
