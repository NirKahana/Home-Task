import axios from 'axios';
import React, { useState, useEffect } from 'react'

import CatalogCard from "./CatalogCard"

const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default function Catalog({ products, setBasketProducts, setProducts, setInputValue, inputValue}) {
  
  // const [inputValue, setInputValue] = useState('');
  const onInputChange = async (e) => {
    const searchString = e.target.value;
    // console.log(searchString);
    setInputValue(searchString)
    const filteredProducts = (await axios.get('/api/v1/products/search', {
      params: {
        q: searchString
      }
    })).data;
    setProducts(filteredProducts);
  }

  return (
    <div className="flex column alignCenter catalog">
      <h2>Catalog</h2>
      <input  className="search" 
              placeholder="Search a product..."
              onChange={onInputChange}
              // onChange={debounce((e) => {onInputChange(e)}, 1000)}
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
