import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import Table from 'react-bootstrap/Table';
import CurrencyRupee from '@mui/icons-material/CurrencyRupee';
import { TextField } from '@mui/material';

export default function CheckOut(props) {
  const location = useLocation();

  const { cart } = useContext(AuthContext);
  const [orderItems, setOrderItems] = useState({});

  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    state: '',
    pinCode: '',
    phoneNo: '',
  });

  const [order, setOrder] = useState({});

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
    setOrderItems(cart);

    setOrder({
      shippingInfo: shippingInfo,
      orderItems: orderItems,
      totalPrice: location.state,
    });

    console.log(order);
  };

  const host = `http://localhost:4000`;
  const navigate = useNavigate();

  const createOrder = async () => {
    try {
      const response = await fetch(`${host}/api/v1/order/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      const res = await response.json();
      if (response.status === 201) {
        // localStorage.setItem('token', auth.token);
        navigate('/order');
        props.showAlert('Order created successfully!', 'success');
      } else {
        props.showAlert('Failed to create order', 'danger');
      }
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  };

  console.log(location.state);

  return (
    <>
      <div
        className="position-relative"
        style={{ margin: '30px 0px', marginTop: '10px' }}
      >
        <center>
          <h1>Finalize your order now:</h1>
        </center>
      </div>

      <div className="d-flex justify-content-center">
        <div className="container m-3">
          <h4>Order Summary</h4>
          <Table striped bordered hover>
            <thead>
              <tr className="table-warning">
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((cartItem) => {
                return (
                  <tr>
                    <td>{cartItem.name}</td>
                    <td>
                      <CurrencyRupee></CurrencyRupee>
                      {cartItem.price}
                    </td>
                    <td>{cartItem.quantity}</td>
                    <td>
                      <CurrencyRupee></CurrencyRupee>
                      {cartItem.totalPrice}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="table-success">
                <td colSpan={3}>Total Order Cost: </td>
                <td>
                  <CurrencyRupee></CurrencyRupee>
                  {location.state}
                </td>
              </tr>
            </tfoot>
          </Table>
        </div>

        <div className="container m-3">
          <h4>Your Shipping info:</h4>
          <TextField
            fullWidth
            sx={{ m: 1 }}
            required
            name="address"
            id="outlined-required"
            label="Address"
            defaultValue=""
            onChange={handleChange}
            value={shippingInfo.address}
          />
          <TextField
            sx={{ width: '45%', m: 1 }}
            required
            name="city"
            id="outlined-required"
            label="City"
            defaultValue=""
            onChange={handleChange}
            value={shippingInfo.city}
          />
          <TextField
            sx={{ width: '45%', m: 1 }}
            required
            name="state"
            id="outlined-required"
            label="State"
            defaultValue=""
            onChange={handleChange}
            value={shippingInfo.state}
          />
          <TextField
            sx={{ width: '45%', m: 1 }}
            required
            name="pinCode"
            margin="normal"
            id="outlined-required"
            label="Pin Code"
            defaultValue=""
            onChange={handleChange}
            value={shippingInfo.pinCode}
          />
          <TextField
            sx={{ width: '45%', m: 1 }}
            required
            margin="normal"
            name="phoneNo"
            id="outlined-required"
            label="Phone Number"
            defaultValue=""
            onChange={handleChange}
            value={shippingInfo.phoneNo}
          />
        </div>
      </div>
      <div
        className="position-relative"
        style={{ margin: '30px 0px', marginTop: '30px' }}
      >
        <center>
          <button className="btn btn-success" onClick={createOrder}>
            Place Order for <CurrencyRupee></CurrencyRupee>
            {location.state}
          </button>
        </center>
      </div>
    </>
  );
}
