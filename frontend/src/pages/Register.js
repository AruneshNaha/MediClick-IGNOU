import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';

function Register(props) {
  const [credentials, setCredentials] = useState({
    email: '',
    name: '',
    password: '',
  });
  const host = 'http://localhost:4000';

  const context = useContext(AuthContext);
  const { authenticate } = context;
  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (
      credentials.email === '' ||
      credentials.name === '' ||
      credentials.password === ''
    ) {
      props.showAlert('Please enter all fields correctly!', 'danger');
    } else {
      e.preventDefault();

      try {
        const response = await fetch(`${host}/api/v1/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const auth = await response.json();
        if (response.status === 200) {
          localStorage.setItem('token', auth.token);
          authenticate();
          navigate('/');
          props.showAlert('You are successfully registered!', 'success');
        } else {
          props.showAlert(auth.error, 'danger');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div
      className="position-relative"
      style={{ margin: '35px 0px', marginTop: '100px' }}
    >
      <center>
        <h1>New to Mediclick? No Problem. Register yourself!</h1>
      </center>

      <div className="container d-flex justify-content-center">
        <div className="card mt-5 p-3" style={{ width: '30rem' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
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
              <label htmlFor="exampleInputEmail1">Your Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter your name"
                value={credentials.name}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
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

            <div className="d-flex justify-content-center m-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
