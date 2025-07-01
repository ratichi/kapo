'use client'
import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"

import Image from "next/image"
export default function ProductList() {
    const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('https://kapo.onrender.com/product') // your NestJS backend
      .then((res) => res.json())
      .then((data) => setProducts(data))
  }, [])

  return (
    <div className="p-4">

      {/* Render Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
