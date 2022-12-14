import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword(props) {
  const navigate = useNavigate();

  const [pass, setPass] = useState({ oldPassword: '', newPassword: '' });

  const host = 'http://localhost:4000';

  const handleChange = (e) => {
    setPass({ ...pass, [e.target.name]: e.target.value });

    console.log(pass);
  };

  const changePassword = async () => {
    console.log(pass);
    if (pass.oldPassword === '' || pass.newPassword === '') {
      props.showAlert('You cannot leave any field empty', 'danger');
      return;
    } else if (pass.oldPassword === pass.newPassword) {
      props.showAlert('Old password cannot be the new password');
      setPass({ oldPassword: '', newPassword: '' });
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${host}/api/v1/updateUserPassword`, {
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
        props.showAlert('Password was changed successfully!', 'success');
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
      <center>
        <h1>Change Password</h1>
      </center>
      <div className="container d-flex justify-content-center">
        <div className="card mt-5 p-3" style={{ width: '30rem' }}>
          <center>
            <h4>Set your password:</h4>
          </center>
          Password:
          <input
            autoComplete="off"
            type="password"
            name="oldPassword"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Old Password"
            value={pass.oldPassword}
            onChange={handleChange}
          />
          Confirm Password:
          <input
            autoComplete="off"
            type="password"
            name="newPassword"
            className="form-control"
            id="exampleInputPassword2"
            placeholder="New Password"
            value={pass.newPassword}
            onChange={handleChange}
          />
          <button className="btn btn-primary m-3" onClick={changePassword}>
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
