import React from 'react';

function ForgotPassword() {
  return (
    <div
      className="position-relative"
      style={{ margin: '35px 0px', marginTop: '100px' }}
    >
      <div className="position-absolute top-0 start-50 translate-middle">
        <h1>Forgot Password</h1>
      </div>

      <div className="my-3 p-5">
        <form
        // onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              //   value={credentials.email}
              //   onChange={onChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Send me a code
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
