'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, User, Menu, X } from 'lucide-react'
import { useCart } from './CartContex'
import { useFilter } from '../context/Filtercontext'
import Image from 'next/image';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const { filters, setFilters } = useFilter();
  const { cart } = useCart()

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filterOpen && (
  <div className="absolute right-4 mt-2 bg-white border shadow-lg rounded-md p-4 z-50 w-[300px]">
    {/* Gender Checkboxes */}
    <div className="mb-4">
      <p className="font-semibold mb-2">სქესი</p>
      <label className="block">
        <input
          type="radio"
          name="gender"
          value="male"
          checked={selectedGender === 'male'}
          onChange={(e) => setSelectedGender(e.target.value)}
        /> მამაკაცი
      </label>
      <label className="block">
        <input
          type="radio"
          name="gender"
          value="female"
          checked={selectedGender === 'female'}
          onChange={(e) => setSelectedGender(e.target.value)}
        /> ქალი
      </label>
    </div>

    {/* Type Selector */}
    <div className="mb-4">
      <p className="font-semibold mb-2">კატეგორია</p>
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-2 py-1"
      >
        <option value="">აირჩიე კატეგორია</option>
        <option value="ყელსაბამი">ყელსაბამი</option>
        <option value="გვირგვინი">გვირგვინი</option>
        <option value="ფეხის აქსესუარი">ფეხის აქსესუარი</option>
        <option value="ყურის აქსესუარი">ყურის აქსესუარი</option>
        <option value="მკლავის აქსესუარი">მკლავის აქსესუარი</option>
        <option value="მაჯის აქსესუარი">მაჯის აქსესუარი</option>
        <option value="სხვა">სხვა</option>
      </select>
    </div>

    {/* Buttons */}
    <div className="flex justify-between">
      <button
        className="text-sm text-gray-600 hover:underline"
        onClick={() => {
          setSelectedGender('');
          setSelectedType('');
        }}
      >
        გასუფთავება
      </button>
      <button
        onClick={() => {
          setFilters({ gender: selectedGender, type: selectedType });
          setFilterOpen(false);
          // ⬇ Trigger filter fetch with selectedGender and selectedType here
        }}
        className="px-3 py-1 bg-black text-white text-sm rounded hover:bg-gray-800"
      >
        გაფილტვრა
      </button>
    </div>
  </div>
)}

        <div className="flex justify-around h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/assets/logo.jpg"
              alt="Logo"
              width={100}
              height={50}
              className='w-[50px]'
            />
            <a href="/" className="text-2xl font-bold text-gray-800">Copley</a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
            <a href="/shop" className="text-gray-600 hover:text-black">Store</a>
            <a href="/about" className="text-gray-600 hover:text-black">About</a>
            <a href="/contact" className="text-gray-600 hover:text-black">Contact</a>
          </nav>

          {/* Search bar */}
          <div className="hidden md:flex items-center gap-4">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                ფილტრი
              </button>
          </div>


          {/* Icons */}
          <div className="flex items-center space-x-4">
            <a href="/login" className="text-gray-600 hover:text-black">
              <User className="w-6 h-6" />
            </a>
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
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
