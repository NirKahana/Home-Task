import React from 'react'

import CatalogCard from "./CatalogCard"

export default function Catalog({ products, setBasketProducts, setProducts }) {
  return (
    <div className="flex column alignCenter catalog">
      <h2>Catalog</h2>
      <div className="grid">
        {products.map((product, index) => (
          <CatalogCard product={product} key={index} setBasketProducts={setBasketProducts} setProducts={setProducts}/>
        ))}
      </div>
    </div>
  )
}
