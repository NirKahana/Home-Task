import axios from 'axios';
import React, { useState } from 'react'
import { PlusCircle, MinusCircle, Trash } from 'react-feather';


export default function BasketCard({ basketProduct, setBasketProducts, setProducts}) {
  // const [itemQuantity, setItemQuantity] = useState(0);
  const basketProductPrice = basketProduct.quantity*basketProduct.price;
  // const onQuantityChange = async (e) => {
  //   const newItemQuantity = Number(e.target.value);
  //   const updatedProductsList = await axios.put('/api/v1/basket/quantity', {
  //     params: {
  //       id: basketProduct.productId,
  //       quantity: basketProduct.quantity
  //     }
  //   }).data;
  //   setBasketProducts(updatedProductsList);
  //   const updatedCatalogProductsList = (await axios.get(`/api/v1/products/all`)).data;
  //   setProducts(updatedCatalogProductsList);
  // } 
  const onMinusClicked = async () => {
    if(basketProduct.quantity > 0) {
      const updatedProductsList = (await axios.put(`/api/v1/basket/minus/${basketProduct.productId}`)).data;
      setBasketProducts(updatedProductsList);
      const updatedCatalogProductsList = (await axios.get(`/api/v1/products/all`)).data;
      setProducts(updatedCatalogProductsList);
    }
  }
  const onPlusClicked = async () => {
    if(basketProduct.quantity < 100) {
      const updatedProductsList = (await axios.put(`/api/v1/basket/plus/${basketProduct.productId}`)).data;
      setBasketProducts(updatedProductsList);
      const updatedCatalogProductsList = (await axios.get(`/api/v1/products/all`)).data;
      setProducts(updatedCatalogProductsList);
    }
  }
  const onRemoveClicked = async () => {
    const updatedProductsList = (await axios.delete(`/api/v1/basket/${basketProduct.productId}`)).data;
      setBasketProducts(updatedProductsList);
      const updatedCatalogProductsList = (await axios.get(`/api/v1/products/all`)).data;
      setProducts(updatedCatalogProductsList);
  }

  return basketProduct ? (
    <div className="basket-card flex column alignCenter">
      <img src={process.env.PUBLIC_URL + `/images/${basketProduct.url}`} className="product-image width100"/>
      <div className="flex alignCenter justifyCenter width100">
        <MinusCircle className="pointer" onClick={onMinusClicked}/>
        <div className="basket-product-quantity">{basketProduct.quantity}</div>
        <PlusCircle className="pointer" onClick={onPlusClicked}/>
        <Trash className="trash-icon pointer" onClick={onRemoveClicked}/>
      </div>
      <div className="basket-product-title"><span>{basketProduct.name}</span><span>{basketProductPrice}$</span></div>
    </div>
  ) : null
}
