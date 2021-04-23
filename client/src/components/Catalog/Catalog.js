import axios from 'axios';
import React, { useState, useEffect } from 'react'

import CatalogCard from "./CatalogCard"

export default function Catalog({ products, setBasketProducts, setProducts }) {
  
  const [inputValue, setInputValue] = useState('');
  const onInputChange = async (e) => {
    const searchString = e.target.value;
    const filteredProducts = (await axios.get('/api/v1/products/search', {
      params: {
        q: searchString
      }
    })).data;
    setProducts(filteredProducts);
    setInputValue(searchString)
  } 

  return (
    <div className="flex column alignCenter catalog">
      <h2>Catalog</h2>
      <input  className="search" 
              placeholder="Search a product..."
              onChange={onInputChange}
              value={inputValue}
      />
      <div className="grid">
        {products.map((product, index) => (
          <CatalogCard  product={product} 
                        key={index} 
                        inputValue={inputValue}
                        setBasketProducts={setBasketProducts} 
                        setProducts={setProducts}/>
        ))}
      </div>
    </div>
  )
}
