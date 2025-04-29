import { Navigate, Route, Routes } from "react-router";
import Register from "./pages/register";
import Login from "./pages/login";
import AppLayout from "./layout/AppLayout";
import { jwtDecode } from "jwt-decode";
import Books from "./pages/books";
import AddBooks from "./pages/addBooks";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");
  let decodedToken = null;
  try {
    decodedToken = token && jwtDecode(token);
  } catch (error) {
    console.log(error);
  }
  // Check if the token is valid and not expired
  // if valid redirect to the app layout else redirect to login
  return decodedToken ? <AppLayout /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<Navigate to="/books" />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add-books" element={<AddBooks />} />
        <Route path="/members" element={<div>Member Page</div>} />
        <Route path="/transactions" element={<div>Transaction Page</div>} />
      </Route>
    </Routes>
  );
}

export default App;
