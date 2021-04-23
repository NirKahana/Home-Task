import React, { useState } from 'react'
import { PlusCircle, MinusCircle } from 'react-feather';


export default function BasketCard({ basketProduct }) {

  const [itemQuantity, setItemQuantity] = useState(0);
  const onQuantityChange = (e) => {
    setItemQuantity(Number(e.target.value))
  } 
  const onMinusClicked = () => {
    if(itemQuantity > 0) {
      setItemQuantity(prevQuantity => prevQuantity-1)
    }
  }
  const onPlusClicked = () => {
    if(itemQuantity < 100) {
      setItemQuantity(prevQuantity => prevQuantity+1)
    }
  }
  return (
    <div className="basket-card flex column alignCenter">
      <img src={process.env.PUBLIC_URL + `/images/${basketProduct.url}`} className="product-image"/>
      <div className="flex alignCenter">
        <MinusCircle className="quantity-icon" onClick={onMinusClicked}/>
        {/* <input type="number"
              value={itemQuantity}
               min="0" 
               max="100" 
               placeholder="0" 
               className="number-input" 
               onChange={onQuantityChange}
        /> */}
        <div className="basket-product-quantity">{basketProduct.quantity}</div>
        <PlusCircle className="quantity-icon" onClick={onPlusClicked}/>
      </div>
      {/* <div className="add-to-cart">
        Add To Cart
      </div> */}
      <div className="basket-product-name">{basketProduct.name}</div>
    </div>
  )
}
