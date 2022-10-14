import React from 'react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';

function SignIn(props) {
  const [credentials, setCredentials] = useState({
    email: '',
    name: '',
    password: '',
  });
  const host = 'http://localhost:4000';

  const context = useContext(AuthContext);
  const { authenticate, authToken, userIsAdmin, adminPrivilege } = context;
  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/api/v1/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const auth = await response.json();
      if (response.status === 200) {
        localStorage.setItem('token', auth.token);
        localStorage.setItem('id', auth.user._id);
        authenticate();
        adminPrivilege(auth);
        navigate('/');
        props.showAlert('You are successfully signed in!', 'success');
        console.log(`Authtoken from auth context: ${authToken}`);
      } else {
        props.showAlert('Invalid Credentials', 'danger');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="position-relative"
      style={{ margin: '35px 0px', marginTop: '100px' }}
    >
      <center>
        <h1>Sign in to Mediclick</h1>
      </center>

      <div className="container d-flex justify-content-center">
        <div className="card mt-5 p-3" style={{ width: '30rem' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <EmailIcon></EmailIcon>
            <input
              type="email"
              className="form-control"
              name="email"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={credentials.email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <PasswordIcon></PasswordIcon>
            <input
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          <div className="d-flex justify-content-center"><button type="submit" className="btn btn-primary m-3">
            Submit
          </button></div>
        </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
