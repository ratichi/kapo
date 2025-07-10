'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function AdminPanel() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [products, setProducts] = useState([])
  const [description, setDescription] = useState('')
  const [gender, setGender] = useState('')
  const [type, setType] = useState('')
  const [imageLinks, setImageLinks] = useState([""]);

  const handleImageChange = (index, value) => {
    const newLinks = [...imageLinks];
    newLinks[index] = value;
    setImageLinks(newLinks);
  };

  const addImageField = () => {
    setImageLinks([...imageLinks, ""]);
  };

  const fetchProducts = async () => {
    const res = await fetch('https://kapo.onrender.com/product')
    const data = await res.json()
    setProducts(data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const deleteProduct = async (id) => {
    await fetch(`https://kapo.onrender.com/product/${id}`, {
      method: 'DELETE',
    })
    fetchProducts() // Refresh list after deletion
  }
  const submitProduct = async () => {
    await fetch('https://kapo.onrender.com/product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price: Number(price), image, description, gender, type, images: imageLinks.filter(Boolean) }),
    })
    window.location.reload();
  }

  return (
    <div>
        <div className="p-8 max-w-lg mx-auto">
        <h1 className="text-2xl mb-4">ახალი პროდუქტის დამატება</h1>
        <input
            className="border p-2 mb-2 w-full"
            placeholder="სახელი"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <input
            className="border p-2 mb-2 w-full"
            placeholder="ფასი"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
        />
        <input
            className="border p-2 mb-2 w-full"
            placeholder="სურათის ლინკი"
            value={image}
            onChange={(e) => setImage(e.target.value)}
        />
        <div className="mb-4">
          <label className="font-semibold mb-2 block">Cloudinary სურათის ლინკები:</label>
          {imageLinks.map((link, index) => (
            <input
              key={index}
              className="border p-2 mb-2 w-full"
              type="text"
              placeholder={`სურათის ლინკი #${index + 1}`}
              value={link}
              onChange={(e) => handleImageChange(index, e.target.value)}
            />
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="text-blue-600 hover:underline"
          >
            + სურათის დამატება
          </button>
        </div>
        <textarea
          className="border p-2 mb-2 w-full"
          placeholder="აღწერა"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <div className="flex gap-4 mb-2">
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === 'male'}
              onChange={(e) => setGender(e.target.value)}
            /> Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === 'female'}
              onChange={(e) => setGender(e.target.value)}
            /> Female
          </label>
        </div>

        <select
          className="border p-2 mb-2 w-full text-black bg-green-500"
          value={type}
          onChange={(e) => setType(e.target.value)}
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
        <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={submitProduct}
        >
            Submit
        </button>
        </div>
            <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow">
          <Image
            src={product.image}
            width={300}
            height={300}
            alt={product.name}
          />
            <h2 className="font-semibold text-lg">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-green-600 font-bold">${product.price}</p>
            <button
              onClick={() => deleteProduct(product.id)}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}
