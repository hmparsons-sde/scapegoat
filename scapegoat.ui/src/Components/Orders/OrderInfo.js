import React from 'react'

export default function OrderInfo({ ...order }) {

  const cartItems = order.lineItems.map(item => {
    return item.product.map(product => (
      <div>
        <h4>{product.description}</h4>
        <p>Price: {product.price}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
    ))
  })
  return (
    <div>
      <h2>{order.user.firstName} {order.user.lastName}'s cart</h2>
      <h3>Cart Items</h3>
      {
      order.lineItems.length > 0 
      ? cartItems
      : "no items in cart"
      }
      <h3>Total:{order.totalCost}</h3>
      <p>Order Status: {order.status}</p>
    </div>
  )
}
