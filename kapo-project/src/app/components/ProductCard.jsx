import { ShoppingCart } from 'lucide-react'

export default function ProductCard({ product }) {
  const { name, price, oldPrice, image, discount } = product

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="relative group">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {discount && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
            -{discount}%
          </span>
        )}
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-base font-semibold text-gray-900 truncate">{name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-green-600">₾{price}</span>
          {oldPrice && (
            <span className="text-sm text-gray-400 line-through">₾{oldPrice}</span>
          )}
        </div>

        <button className="mt-2 w-full flex items-center justify-center bg-black text-white text-sm font-medium py-2 px-4 rounded-xl hover:bg-gray-800 transition-colors">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  )
}
