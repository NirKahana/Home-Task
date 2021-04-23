import React from 'react'

import Card from "./Card"

export default function Catalog({ products }) {
  return (
    <div className="flex column alignCenter catalog">
      <h2>Catalog</h2>
      <div className="grid">
        {products.map((product, index) => (
          <Card product={product} key={index}/>
        ))}
      </div>
    </div>
  )
}
