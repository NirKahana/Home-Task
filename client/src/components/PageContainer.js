import React from 'react'
import Header from "./Header"
import ShopContainer from './ShopContainer';

export default function PageContainer() {
  return (
    <div className="page-container flex column">
      <Header />
      <ShopContainer />
    </div>
  )
}
