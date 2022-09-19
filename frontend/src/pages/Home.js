import React from 'react';
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
  return (
    <AuthState>
      <Router>
        <Navbar></Navbar>
        <Alert title="Success!" message="You are logged in"></Alert>
        <Routes>
          <Route exact path="/" element={<Dashboard></Dashboard>}></Route>
          <Route exact path="/signin" element={<SignIn></SignIn>}></Route>
          <Route exact path="/register" element={<Register></Register>}></Route>
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
