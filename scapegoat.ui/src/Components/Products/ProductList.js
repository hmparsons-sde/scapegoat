import React from "react";
import ProductCard from "./ProductCard";

export default function ProductList({products, setProducts}) {
  
    return (
    <div>
      {
        products 
        ? products.map((product, i) => (<ProductCard key={i} product={product} products={products} setProducts={setProducts} />))
        : ''
      }
    </div>
    )
}
