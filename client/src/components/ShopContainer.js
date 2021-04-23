import React, { useEffect, useState } from "react";
import axios from 'axios';
import Basket from "./Basket/Basket";
import Catalog from ".//Catalog/Catalog";

export default function ShopContainer() {
  
  const [products, setProducts] = useState();
  const [basketProducts, setBasketProducts] = useState();
  useEffect(() => {
    (async () => {
      const products = (await axios.get('/api/v1/products/all')).data;
      const basketProducts = (await axios.get('/api/v1/basket/all')).data;
      setProducts(products);
      setBasketProducts(basketProducts);
    })()
  }, []);
  return (products && basketProducts) ? (
    <>
      <div className="flex shop-container">
        <Basket basketProducts={basketProducts} setBasketProducts={setBasketProducts} setProducts={setProducts}/>
        <Catalog products={products} setBasketProducts={setBasketProducts} setProducts={setProducts}/>
      </div>
    </>
  ): null
}
