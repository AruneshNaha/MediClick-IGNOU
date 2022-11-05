import React from 'react';
import Navbar from '../components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutUs from './AboutUs';
import Dashboard from './Dashboard';
import SignIn from './SignIn';
import NotFound from './NotFound';
import Register from './Register';
import Products from './Products';
import ForgotPassword from './ForgotPassword';
import AuthState from './context/AuthState';
import Cart from './Cart';
import CheckOut from './CheckOut';
import Order from './Order';
import ManageOrders from './ManageOrders';
import ProductPage from './ProductPage';
import AdminDashboard from './adminRoutes/AdminDashboard';
import CreateProduct from './adminRoutes/CreateProduct';
import AddProductImage from './adminRoutes/AddProductImage';
import ManageProducts from './adminRoutes/ManageProducts';
import ManageOrdersAdmin from './adminRoutes/ManageOrdersAdmin';
import ManageUsers from './adminRoutes/ManageUsers';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChangePassword from './ChangePassword';
import ManageCategories from './adminRoutes/ManageCategories';

export default function Home() {

  const showAlert = (message, type) => {
    if(type === 'success'){
      toast.success(message, 
        {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      }
      );
    }else if(type === 'danger'){
      toast.error(message, 
        {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      }
      );
    }else{
      toast.info(message, 
        {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      }
      );
    } 
  };

  return (
    <Router>
      <AuthState>
        <ToastContainer  />
        {/* Same as */}
        <ToastContainer />
        <Navbar showAlert={showAlert}></Navbar>
        <Routes>
          <Route
            exact
            path="/"
            element={<Dashboard showAlert={showAlert}></Dashboard>}
          ></Route>
          <Route
            exact
            path="/signin"
            element={<SignIn showAlert={showAlert}></SignIn>}
          ></Route>
          <Route
            exact
            path="/register"
            element={<Register showAlert={showAlert}></Register>}
          ></Route>
          <Route
            exact
            path="/products"
            element={<Products showAlert={showAlert}></Products>}
          ></Route>
          <Route
            exact
            path="/productInfo"
            element={<ProductPage showAlert={showAlert}></ProductPage>}
          ></Route>
          <Route
            exact
            path="/cart"
            element={<Cart showAlert={showAlert}></Cart>}
          ></Route>
          <Route
            exact
            path="/checkout"
            element={<CheckOut showAlert={showAlert}></CheckOut>}
          ></Route>
          <Route
            exact
            path="/order"
            element={<Order showAlert={showAlert}></Order>}
          ></Route>
          <Route
            exact
            path="/manageorders"
            element={<ManageOrders showAlert={showAlert}></ManageOrders>}
          ></Route>
          <Route
            exact
            path="/changepassword"
            element={<ChangePassword showAlert={showAlert}></ChangePassword>}
          ></Route>
          <Route
            exact
            path="/adminDashboard"
            element={<AdminDashboard showAlert={showAlert}></AdminDashboard>}
          ></Route>
          <Route
            exact
            path="/manageProducts"
            element={<ManageProducts showAlert={showAlert}></ManageProducts>}
          ></Route>
          <Route
            exact
            path="/mangeCategories"
            element={<ManageCategories showAlert={showAlert}></ManageCategories>}
          ></Route>
          <Route
            exact
            path="/manageUsersAdmin"
            element={<ManageUsers showAlert={showAlert}></ManageUsers>}
          ></Route>
          <Route
            exact
            path="/manageOrdersAdmin"
            element={
              <ManageOrdersAdmin showAlert={showAlert}></ManageOrdersAdmin>
            }
          ></Route>
          <Route
            exact
            path="/createProduct"
            element={<CreateProduct showAlert={showAlert}></CreateProduct>}
          >
            <Route
              path=":productId"
              element={<AddProductImage showAlert={showAlert} />}
            ></Route>
          </Route>
          <Route
            exact
            path="/forgotpassword"
            element={<ForgotPassword showAlert={showAlert}></ForgotPassword>}
          ></Route>
          <Route exact path="/about" element={<AboutUs></AboutUs>}></Route>
          <Route exact path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </AuthState>
    </Router>
  );
}
