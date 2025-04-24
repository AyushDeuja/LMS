import { Navigate, Route, Routes } from "react-router";
import Register from "./pages/register";
import Login from "./pages/login";
import AppLayout from "./layout/AppLayout";
import { jwtDecode } from "jwt-decode";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");
  let decodedToken = null;
  try {
    decodedToken = token && jwtDecode(token);
    console.log(decodedToken);
  } catch (error) {
    console.log(error);
  }
  return decodedToken ? <AppLayout /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/books" element={<div>Book Page</div>} />
        <Route path="/members" element={<div>Member Page</div>} />
        <Route path="/transactions" element={<div>Transaction Page</div>} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
