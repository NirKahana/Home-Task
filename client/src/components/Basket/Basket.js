import React, { useState } from "react";
import { ShoppingCart } from 'react-feather';

import BasketCard from "./BasketCard";

export default function Basket({ basketProducts, setBasketProducts, setProducts, inputValue }) {
  
  const [cartIsOpen, setCartIsOpen] = useState(true);
  
  const onCartClick = () => {
    setCartIsOpen(!cartIsOpen)
  }
  const calcBasketPrice = () => {
    const reducer = (totalPrice, product) => {
      const productPrice = product.quantity*product.price
      return totalPrice+productPrice
    }
    return basketProducts.reduce(reducer, 0);
  }

  return basketProducts ? (
      <div className={cartIsOpen ? `flex column alignCenter basket` : `flex column alignCenter closed-basket`}>
        <ShoppingCart className={`cart-icon pointer ${!cartIsOpen && `closed`}`} onClick={onCartClick}/>
        <h2 className="width100">Cart</h2>
        <div className="flex column alignCenter basket-list">
          {(basketProducts.length > 0) 
          ? basketProducts.map((basketProduct, index) => (
            <BasketCard basketProduct={basketProduct} key={index} setBasketProducts={setBasketProducts} setProducts={setProducts} inputValue={inputValue}/>
          ))
          : <div className="empty-basket">Your cart is empty :(</div>
          }
        </div>
        {(basketProducts.length > 0) && <div className="total-price pointer">Total Price: {calcBasketPrice()}$</div>}
      </div>
  ) : null;
}
