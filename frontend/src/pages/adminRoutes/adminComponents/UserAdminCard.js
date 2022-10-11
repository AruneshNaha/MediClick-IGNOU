import React, { useState } from 'react';

export default function UserAdminCard(props) {
  const localhost = 'http://localhost:4000';
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const [userRole, setUserRole] = useState(props.user.role);

  const currentUserId = localStorage.getItem('id');

  const updateUserRole = async (userId) => {
    if (token && role === 'admin') {
      await fetch(`${localhost}/api/v1/updateuserRole/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      }).then(async (response) => {
        response.status === 200
          ? setUserRole('admin')
          : props.showAlert('Failed to update user role', 'danger');
      });
    } else {
      props.showAlert('You are not an admin', 'danger');
    }
  };

  return (
    <>
      {currentUserId !== props.user._id ? (
        <div className="card p-3 m-5">
          <div className="d-flex justify-content-between">
            <h4 className="fw-light">User {props.index + 1}</h4>
            <h4 className="fw-light">User ID: {props.user._id}</h4>
          </div>

          <div className="d-flex justify-content-between">
            <h4 className="fw-semibold">User Info</h4>
            <h4>
              Role:{' '}
              <span
                className={
                  userRole === 'admin' ? `badge bg-danger` : `badge bg-success`
                }
              >
                {userRole}
              </span>
            </h4>
          </div>
          <p>
            ID: {props.user._id} <br />
            Name: {props.user.name} <br />
            Email: {props.user.email}
          </p>
          <div className="d-flex justify-content-between">
            {userRole !== 'admin' ? (
              <button
                className="btn btn-success m-3"
                onClick={() => {
                  updateUserRole(props.user._id);
                }}
              >
                Set user to admin
              </button>
            ) : (
              ''
            )}
            <button
              className="btn btn-danger m-3"
              onClick={() => {
                props.deleteUser(props.user._id);
              }}
            >
              Delete this user
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
