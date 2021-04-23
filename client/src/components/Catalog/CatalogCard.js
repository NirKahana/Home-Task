import React, { useRef } from 'react';
import axios from 'axios';
import { PlusCircle, MinusCircle } from 'react-feather';


export default function CatalogCard({ product, setBasketProducts, setProducts }) {

  const inputRef = useRef();

  const onWheel = () => {
    inputRef.current.blur();
  };
  const onQuantityChange = async (e) => {
    const updatedProductsList = (await axios.put(`/api/v1/basket/quantity`, {
        id: product.id,
        quantity: Number(e.target.value)
    })).data;
      setBasketProducts(updatedProductsList);
      const updatedCatalogProductsList = (await axios.get(`/api/v1/products/all`)).data;
      setProducts(updatedCatalogProductsList);
  } 
  const onMinusClicked = async () => {
    if(product.quantityInBasket > 0) {
      const updatedBasketProductsList = (await axios.put(`/api/v1/basket/minus/${product.id}`)).data;
      setBasketProducts(updatedBasketProductsList);
      const updatedCatalogProductsList = (await axios.get(`/api/v1/products/all`)).data;
      setProducts(updatedCatalogProductsList);
    }
  }
  const onPlusClicked = async () => {
    if(product.quantityInBasket < 100) {
      const updatedBasketProductsList = (await axios.put(`/api/v1/basket/plus/${product.id}`)).data;
      setBasketProducts(updatedBasketProductsList);
      const updatedCatalogProductsList = (await axios.get(`/api/v1/products/all`)).data;
      setProducts(updatedCatalogProductsList);
    }
  }
  return (
    <div className="card flex column alignCenter" >
      <img src={process.env.PUBLIC_URL + `/images/${product.url}`} className="product-image"/>
      {/* <div className="product-title"><span>{product.name}</span><span>{product.price}$</span></div> */}
      <div>{product.name}</div>
      <div className="product-price">{product.price}$</div>
      <div className="flex alignCenter">
        <MinusCircle className="quantity-icon" onClick={onMinusClicked}/>
        <input type="number"
              value={product.quantityInBasket || 0}
              min="0" 
              max="100" 
              className="number-input" 
              onChange={onQuantityChange}
              onWheel={onWheel}
              ref={inputRef}
        />
        <PlusCircle className="quantity-icon" onClick={onPlusClicked}/>
      </div>
      {/* <div className="add-to-cart">Add To Cart</div> */}
      {/* <div>{product.name}</div> */}
      {/* <div>{product.name} {product.price}$</div> */}
    </div>
  )
}
