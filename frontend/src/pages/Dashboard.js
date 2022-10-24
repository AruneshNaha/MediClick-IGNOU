import React, { useContext } from 'react';
import Crsl from '../components/Crsl';
import AuthContext from './context/AuthContext';
import AuthState from './context/AuthState';

export default function Dashboard() {
  const context = useContext(AuthContext);
  const { authToken } = context;
  const getAdmin = localStorage.getItem('role');

  console.log(`Authtoken from auth context: ${authToken}`);

  return (
    <AuthState>
      <div
        className="position-relative"
        style={{ margin: '30px 0px', marginTop: '10px' }}
      >
        <center>
          <h1>
            Welcome to MediClick
            {getAdmin === 'admin' ? (
              <h5>
                <span class="badge bg-danger">Admin privilege</span>
              </h5>
            ) : (
              ''
            )}
          </h1>
        </center>
      </div>
      <Crsl></Crsl>
    </AuthState>
  );
}
