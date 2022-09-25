import React from 'react'

export default function CartItem(props) {
  return (
    <div className="card text-left">
              <div className="card-header">
                <ul className="nav nav-pills card-header-pills">
                  <li className="nav-item">
                    <a className="nav-link disabled" href="/">
                      {props.cartItem.name}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="card-body d-flex justify-content-between">
                <h5 className="card-title">{`Rs. ${props.cartItem.price}`}</h5>
                <p className="card-text">{`Total Price ${props.cartItem.totalPrice}`}</p>
                <a
                  href="/"
                  className="btn btn-primary"
                >{`Quantity: ${props.cartItem.quantity}`}</a>
              </div>
            </div>
  )
}
