import { Route, Routes } from "react-router";
import Register from "./pages/register";
import Login from "./pages/login";
import AppLayout from "./layout/AppLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
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
