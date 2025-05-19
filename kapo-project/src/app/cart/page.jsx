'use client'
import { useCart } from '../components/CartContex'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
    const { cart, updateQuantity, removeFromCart } = useCart()

    const totalPrice = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border p-4 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded"
                  />
                  <div>
                    <h2 className="text-lg font-medium">{item.name}</h2>
                    <p className="text-sm text-gray-500">₾{item.price}</p>
                  </div>
                </div>
            <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.id, -1)}
              className="px-2 py-1 bg-gray-200 rounded text-black"
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, 1)}
              className="px-2 py-1 bg-gray-200 rounded text-black"
            >
              +
            </button>
            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-4 text-red-500 hover:underline text-sm"
            >
              Remove
            </button>
          </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <span>total price :{totalPrice}</span>
            <Link href="/checkout">
            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Go to Checkout
            </button>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
