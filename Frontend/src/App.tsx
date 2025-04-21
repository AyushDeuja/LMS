import { Route, Routes } from "react-router";
import Register from "./pages/register";
import Login from "./pages/login";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
