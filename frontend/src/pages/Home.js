import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Alert from '../components/Alert';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AboutUs from './AboutUs';
import Dashboard from './Dashboard';
import SignIn from './SignIn';
import NotFound from './NotFound';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import AuthState from './context/AuthState';

export default function Home() {

  const [alert, setAlert] = useState("")

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}

  return (
    <AuthState>
      <Router>
        <Navbar showAlert={showAlert}></Navbar>
        <Alert alert={alert}></Alert>
        <Routes>
          <Route exact path="/" element={<Dashboard></Dashboard>}></Route>
          <Route exact path="/signin" element={<SignIn showAlert={showAlert}></SignIn>}></Route>
          <Route exact path="/register" element={<Register showAlert={showAlert}></Register>}></Route>
          <Route
            exact
            path="/forgotpassword"
            element={<ForgotPassword></ForgotPassword>}
          ></Route>
          <Route exact path="/about" element={<AboutUs></AboutUs>}></Route>
          <Route exact path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </Router>
    </AuthState>
  );
}
