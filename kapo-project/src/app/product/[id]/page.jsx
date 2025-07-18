'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useCart } from '@/app/components/CartContex'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'


export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://kapo.onrender.com/product/${id}`)
      const data = await res.json()
      setProduct(data)
    }

    if (id) fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1000) // Reset animation after 1s
  }

  if (!product) return <p>Loading...</p>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        className="mb-4 rounded-xl"
        spaceBetween={10}
        slidesPerView={1}
      >
        {(product.images?.length > 0 ? product.images : [product.image]).map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Product image ${index + 1}`}
              className="w-full h-96 object-cover rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-xl text-green-600 font-semibold mb-2">₾{product.price}</p>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-sm text-gray-500 mb-2">Type: {product.type}</p>
      <p className="text-sm text-gray-500 mb-2">Gender: {product.gender}</p>

      <motion.button
        onClick={handleAddToCart}
        className="mt-6 bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition"
        whileTap={{ scale: 0.95 }}
        animate={added ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.4 }}
      >
        {added ? '✔ Added!' : 'Add to Cart'}
      </motion.button>
    </div>
  )
}
