import "./assets/css/App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { AuthProvider } from './context/authContext';
import { CartProvider } from "./context/CartProvider";
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import AdminDashboard from "./pages/AdminDashboard"
import Home from "./pages/Home";
import Forgotpassword from "./pages/ForgotPassword";
import Products_display from "./pages/Products_display";
import Cart from "./pages/Cart";
import Trainingwithcss from "./pages/Trainingwithcss";
function App() {
  return (
    <div>
      <CartProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path='/cart' element={<Cart />}></Route>
              <Route path="/home" element={
                <PrivateRoute roles={['admin', 'user']} ><Home /></PrivateRoute>}
              />
              <Route path="/adminDashboard" element={
                <PrivateRoute roles={['admin']} ><AdminDashboard /></PrivateRoute>}
              />
              {/* <Route path="/adminDashboard" element={<AdminDashboard />}></Route> */}
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/product" element={<Products_display />}></Route>
              <Route path="/forgot_password" element={<Forgotpassword />}></Route>
              <Route path="/train" element={<Trainingwithcss />}></Route>
              {/* <PrivateRoute path="/dashboard" element={<Dashboard />} /> */}
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </CartProvider>
    </div >
  );
}

export default App;