import React, { useRef } from 'react';
import axios from 'axios';
import { PlusCircle, MinusCircle } from 'react-feather';

export default function CatalogCard({ product, setBasketProducts, setProducts, inputValue }) {

  const inputRef = useRef();

  const onWheel = () => {
    inputRef.current.blur();
  };
  const onFocus = () => {
    inputRef.current.select()
  };
  const onQuantityChange = async (e) => {
    const updatedProductsList = (await axios.put(`/api/v1/basket/quantity`, {
        id: product.id,
        quantity: Number(e.target.value)
    })).data;
      setBasketProducts(updatedProductsList);
      const updatedCatalogProductsList = (await axios.get(`/api/v1/products/search`, {
        params: {
          q: inputValue
        }
      })).data;
      setProducts(updatedCatalogProductsList);
  }
  const onMinusClicked = async () => {
    if(product.quantityInBasket > 0) {
      const updatedBasketProductsList = (await axios.put(`/api/v1/basket/minus/${product.id}`)).data;
      const updatedCatalogProductsList = (await axios.get(`/api/v1/products/search`, {
        params: {
          q: inputValue
        }
      })).data;
      setBasketProducts(updatedBasketProductsList);
      setProducts(updatedCatalogProductsList);
    }
  }
  const onPlusClicked = async () => {
    if(product.quantityInBasket < 100) {
      const updatedBasketProductsList = (await axios.put(`/api/v1/basket/plus/${product.id}`)).data;
      const updatedCatalogProductsList = (await axios.get(`/api/v1/products/search`, {
        params: {
          q: inputValue
        }
      })).data;
      setBasketProducts(updatedBasketProductsList);
      setProducts(updatedCatalogProductsList);
    }
  }
  return (
    <div className="card flex column alignCenter" >
      <img src={process.env.PUBLIC_URL + `/images/${product.url}`} className="product-image width100"/>
      <div>{product.name}</div>
      <div className="product-price">{product.price}$</div>
      <div className="flex alignCenter">
        <MinusCircle className="pointer" onClick={onMinusClicked}/>
        <input type="number"
              value={product.quantityInBasket || 0}
              min="0" 
              max="100" 
              className="number-input" 
              onChange={onQuantityChange}
              onWheel={onWheel}
              ref={inputRef}
              onFocus={onFocus}
        />
        <PlusCircle className="pointer" onClick={onPlusClicked}/>
      </div>
    </div>
  )
}
