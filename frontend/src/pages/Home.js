import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import FireAlert from '../components/Alert';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AboutUs from './AboutUs';
import Dashboard from './Dashboard';
import SignIn from './SignIn';
import NotFound from './NotFound';
import Register from './Register';
import Products from '../components/Products';
import ForgotPassword from './ForgotPassword';
import AuthState from './context/AuthState';
import Cart from './Cart';
import AuthContext from './context/AuthContext';
import CheckOut from './CheckOut';
import Order from './Order';
import ManageOrders from './ManageOrders';
import ProductPage from './ProductPage';
import AdminDashboard from './adminRoutes/AdminDashboard';
import CreateProduct from './adminRoutes/CreateProduct';

export default function Home() {

  const [alert, setAlert] = useState("")

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 3000);
}

  return (
      <Router>
            <AuthState>

        <Navbar showAlert={showAlert}></Navbar>
        <FireAlert alert={alert}></FireAlert>
        <Routes>
          <Route exact path="/" element={<Dashboard showAlert={showAlert}></Dashboard>}></Route>
          <Route exact path="/signin" element={<SignIn showAlert={showAlert}></SignIn>}></Route>
          <Route exact path="/register" element={<Register showAlert={showAlert}></Register>}></Route>
          <Route exact path="/products" element={<Products showAlert={showAlert}></Products>}></Route>
          <Route exact path="/productInfo" element={<ProductPage showAlert={showAlert}></ProductPage>}></Route>
          <Route exact path="/cart" element={<Cart showAlert={showAlert}></Cart>}></Route>
          <Route exact path="/checkout" element={<CheckOut showAlert={showAlert}></CheckOut>}></Route>
          <Route exact path="/order" element={<Order showAlert={showAlert}></Order>}></Route>
          <Route exact path="/manageorders" element={<ManageOrders showAlert={showAlert}></ManageOrders>}></Route>
          <Route exact path="/adminDashboard" element={<AdminDashboard showAlert={showAlert}></AdminDashboard>}></Route>
          <Route exact path="/createProduct" element={<CreateProduct showAlert={showAlert}></CreateProduct>}></Route>
          <Route
            exact
            path="/forgotpassword"
            element={<ForgotPassword></ForgotPassword>}
          ></Route>
          <Route exact path="/about" element={<AboutUs></AboutUs>}></Route>
          <Route exact path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
        </AuthState>

      </Router>
  );
}
