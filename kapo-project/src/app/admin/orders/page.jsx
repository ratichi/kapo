'use client'

import { useEffect, useState } from 'react'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://kapo.onrender.com/order') // Your NestJS API endpoint to get orders
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch orders')
        return res.json()
      })
      .then(data => {
        setOrders(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading orders...</p>
  if (error) return <p className="text-red-500">Error: {error}</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Orders</h1>
      {orders.length === 0 && <p>No orders found.</p>}
      <ul>
        {orders.map(order => (
          <li key={order.id} className="border rounded p-4 mb-4">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Items:</strong></p>
            <ul className="ml-4 list-disc">
              {order.items.map(item => (
                <li key={item.productId}>
                  {item.name} — Quantity: {item.quantity} — Price: ${item.price}
                </li>
              ))}
            </ul>
            <p><strong>Total Price:</strong> ${order.items.reduce((acc, i) => acc + i.price * i.quantity, 0)}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
