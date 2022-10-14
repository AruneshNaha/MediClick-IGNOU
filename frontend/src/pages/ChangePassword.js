import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword(props) {

    const navigate = useNavigate()

  const [pass, setPass] = useState({ oldPassword: '', newPassword: '' });

  const host = "http://localhost:4000"

  const changePassword = async() => {
    console.log(pass)
    if (
        pass.oldPassword === "" ||
        pass.newPassword === ""
      ) {
        props.showAlert(
          'You cannot leave any field empty',
          'danger'
        );
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
  }

  return (
    <div
      className="position-relative"
      style={{ margin: '35px 0px', marginTop: '100px' }}
    >
      <center>
        <h1>Forgot Password</h1>
      </center>
      <div className="container mt-3">
        <center>
          <h4>Set your password:</h4>
        </center>
        Password:
        <input
          type="password"
          name="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Old Password"
          value={pass.oldPassword}
          onChange={(e) => {
            setPass({oldPassword: e.target.value})
          }}
        />
        Confirm Password:
        <input
          type="password"
          name="confirmPassword"
          className="form-control"
          id="exampleInputPassword2"
          placeholder="New Password"
          value={pass.newPassword}
          onChange={(e) => {
            setPass({newPassword: e.target.value})
          }}
        />
        <button className="btn btn-primary" onClick={changePassword}>
          Reset Password
        </button>
      </div>
    </div>
  );
}
