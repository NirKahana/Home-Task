import React, { useState } from "react";
import { ShoppingCart } from 'react-feather';

import BasketCard from "./BasketCard";

export default function Basket({ basketProducts }) {
  
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
        <ShoppingCart className="cart-icon" onClick={onCartClick}/>
        <h2>Basket</h2>
        <div className="flex column alignCenter basket-list">
          {basketProducts.map((basketProduct, index) => (
            <BasketCard basketProduct={basketProduct} key={index}/>
          ))}
        </div>
        <div className="total-price">Total Price: {calcBasketPrice()}$</div>
      </div>
  ) : null;
}
