import { Navigate, Route, Routes } from "react-router";
import Register from "./pages/register";
import Login from "./pages/login";
import AppLayout from "./layout/AppLayout";
import { jwtDecode } from "jwt-decode";
import Books from "./pages/books";
import AddBooks from "./pages/addEditBooks";
import Members from "./pages/members";
import AddEditMembers from "./pages/addEditMembers";

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
        <Route path="/add-book" element={<AddBooks />} />
        <Route path="/edit-book/:id" element={<AddBooks />} />
        <Route path="/delete-book/:id" element={<AddBooks />} />
        <Route path="/members" element={<Members />} />
        <Route path="/add-member" element={<AddEditMembers />} />
        <Route path="/edit-member/:id" element={<AddEditMembers />} />
        <Route path="/delete-member/:id" element={<AddEditMembers />} />
        <Route path="/transactions" element={<div>Transaction Page</div>} />
      </Route>
      <Route
        path="*"
        element={
          <p className="text-red-600 font-bold text-3xl flex items-center justify-center h-screen">
            ERROR 404: PAGE NOT FOUND
          </p>
        }
      />
    </Routes>
  );
}

export default App;
