import React from "react";

export default function SingleProduct(product) {
  console.log(product);
  return (
    <div>
      Product Type: {product.product.productType} <br/>
      Description: {product.product.description} <br/>
    </div>
  )
}
