import React from "react";
import Basket from "./Basket";
import Catalog from "./Catalog";

export default function ShopContainer() {
  return (
    <>
      <div className="flex shop-container">
        <Basket />
        <Catalog />
      </div>
    </>
  );
}
