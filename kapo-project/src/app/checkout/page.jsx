'use client'
import { loadStripe } from '@stripe/stripe-js'
import { useState } from 'react'
import { useCart } from '../components/CartContex'
const stripePromise = loadStripe('pk_test_...') // your public key

export default function CheckoutForm() {
  const { cart, setCart } = useCart()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email)
  const handleSubmit = async (e) => {
  e.preventDefault()

  // Validate form first...
  if (!name || !email || !phone || !address) {
    setError('Please fill all fields.')
    return
  }

  try {
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    // Call backend to create payment intent
    const res = await fetch('http://localhost:3001/order/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: totalAmount }),
    })

    const { clientSecret } = await res.json()

    const stripe = await stripePromise

    const { error: stripeError } = await stripe.redirectToCheckout({
      lineItems: cart.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      successUrl: 'http://localhost:3000/success',
      cancelUrl: 'http://localhost:3000/checkout',
    })

    if (stripeError) throw new Error(stripeError.message)

  } catch (err) {
    console.error(err)
    setError('Payment failed.')
  }
}
  if (success) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Thank you for your order!</h2>
        <p>We will contact you soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-black">Checkout</h2>

      {error && <p className="mb-4 text-red-500">{error}</p>}

      <label className="block mb-2 text-black">
        Name
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mt-1"
          required
        />
      </label>

      <label className="block mb-2  text-black">
        Email
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mt-1"
          required
        />
      </label>

      <label className="block mb-2  text-black">
        Phone
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mt-1"
          required
        />
      </label>

      <label className="block mb-4 text-black">
        Address
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mt-1"
          required
        />
      </label>

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition text-black"
      >
        Place Order
      </button>
    </form>
  )
}
