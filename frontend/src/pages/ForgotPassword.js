import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword(props) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [pass, setPass] = useState({ password: '', confirmPassword: '' });

  const [mailSent, setMailSent] = useState(0);

  const host = 'http://localhost:4000';

  const sendEmail = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${host}/api/v1/password/forgot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const res = await response.json();
      if (response.status === 200) {
        setLoading(false);
        setMailSent(1);
        props.showAlert('Code has been sent successfully!', 'success');
      } else {
        setLoading(false);
        props.showAlert(`Failed to send a code: ${res.error}`, 'danger');
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setPass({ ...pass, [e.target.name]: e.target.value });
  };

  const resetPassword = async () => {
    if (
      !pass.password ||
      !pass.confirmPassword ||
      pass.confirmPassword !== pass.password
    ) {
      props.showAlert(
        'Please enter matching values in password and confirm Password field',
        'danger'
      );
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${host}/api/v1/password/reset/${code}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify(pass),
      });

      const res = await response.json();
      if (response.status === 200) {
        navigate(`/`);
        props.showAlert('Password was reset successfully!', 'success');
      } else {
        props.showAlert(res.error, 'danger');
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="position-relative"
      style={{ margin: '35px 0px', marginTop: '100px' }}
    >
      <div className="position-absolute top-0 start-50 translate-middle">
        <h1>Forgot Password</h1>
      </div>

      {loading ? (
        <div className="container ">
          <h5>Please wait while we send you a code...</h5>
        </div>
      ) : (
        ''
      )}

      {mailSent ? (
        <div className="container my-3">
          <br />
          <br />
          <center>
            <h4 className="mt-3">
              Enter the password reset code from your email:
            </h4>
          </center>
          <TextField
            fullWidth
            sx={{ mt: 1 }}
            required
            name="code"
            id="outlined-required"
            label="Code"
            defaultValue=""
            onChange={(e) => {
              setCode(e.target.value);
              console.log(code);
            }}
          />
          <center>
            <h4>Set your password:</h4>
          </center>
          Password:
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={pass.password}
            onChange={onChange}
          />
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={pass.confirmPassword}
            onChange={onChange}
          />
          <button className="btn btn-primary" onClick={resetPassword}>
            Reset Password
          </button>
        </div>
      ) : (
        <div className="my-3 p-5">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <button
            type="submit m-3"
            className="btn btn-primary"
            onClick={sendEmail}
          >
            Send me a code
          </button>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
