'use client'

import { useState } from 'react'
import { ShoppingCart, User, Menu, X } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-gray-800">KapoShop</a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
            <a href="/shop" className="text-gray-600 hover:text-black">Shop</a>
            <a href="/about" className="text-gray-600 hover:text-black">About</a>
            <a href="/contact" className="text-gray-600 hover:text-black">Contact</a>
          </nav>

          {/* Search bar */}
          <div className="hidden md:block flex-1 mx-6">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <a href="/login" className="text-gray-600 hover:text-black">
              <User className="w-6 h-6" />
            </a>
            <a href="/cart" className="relative text-gray-600 hover:text-black">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                2
              </span>
            </a>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-4 pb-4">
          <nav className="flex flex-col space-y-2">
            <a href="/shop" className="text-gray-600 hover:text-black">Shop</a>
            <a href="/about" className="text-gray-600 hover:text-black">About</a>
            <a href="/contact" className="text-gray-600 hover:text-black">Contact</a>
            <input
              type="text"
              placeholder="Search..."
              className="mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </nav>
        </div>
      )}
    </header>
  )
}
