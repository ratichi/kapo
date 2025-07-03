'use client'
import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"
import { useFilter } from "../context/Filtercontext"

import Image from "next/image"
export default function ProductList() {
    const [products, setProducts] = useState([])
      const { filters } = useFilter();


  useEffect(() => {
    const query = new URLSearchParams();

    if (filters.gender) query.append('gender', filters.gender);
    if (filters.type) query.append('type', filters.type);

    fetch(`https://kapo.onrender.com/product?${query.toString()}`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [filters]);


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
