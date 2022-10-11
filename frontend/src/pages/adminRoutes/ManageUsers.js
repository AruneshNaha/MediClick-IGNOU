import React, { useEffect, useState } from 'react'
import UserAdminCard from './adminComponents/UserAdminCard';

export default function ManageUsers(props) {

    const localhost = 'http://localhost:4000';
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const [users, setUsers] = useState([])

    const getAllUsers = async () => {
        if (token && role === 'admin') {
          await fetch(`${localhost}/api/v1/getAllUsers`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              token: token,
            },
          }).then(async (response) => {
            const res = await response.json();
            await setUsers(res.users);
          });
        } else {
          props.showAlert('You are not an admin');
        }
      };

      const deleteUser = async(userId) => {
        if (token && role === 'admin') {
          await fetch(`${localhost}/api/v1/deleteUser/${userId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              token: token,
            },
          }).then(async (response) => {
            if(response.status === 200){
              props.showAlert("User deleted succesfully", 'success')
              getAllUsers()
            }
          });
        } else {
          props.showAlert('You are not an admin', 'danger');
        }
      }

      useEffect(() => {
        getAllUsers()
      }, [])
      

  return (
    <>
      <div
        className="position-relative"
        style={{ margin: '30px 0px', marginTop: '10px' }}
      >
        <center>
          <h1>Manage Users</h1>
          <h6>
            <span className="badge bg-danger">Admin privilege</span>
          </h6>
        </center>
      </div>

      <div className="container">
        <h3 className="m-3 fw-semibold">
          <mark>
            Total Number of users: 
          </mark>
        </h3>

        <center><h4 className='text-muted'>{users.length === 0 ? "No users to view" : ""}</h4></center>

        {users.map((user, index) => {
          return (
            <UserAdminCard
              key={user._id}
              user={user}
              index={index}
              deleteUser={deleteUser}
            ></UserAdminCard>
          );
        })}
      </div>
    </>
  )
}
