import React from "react";
import { deleteProduct, getAllProducts } from "../../helpers/data/productData";

export default function ProductCard({product, products, setProducts }) {

  const handleButton = (p) => {
    switch (p) {
      case 'delete': 
        deleteProduct(product.productId).then(r => console.warn(r));
        getAllProducts().then(response => setProducts(response));
      break;
      default:
      break;
    }
  };

  return (
    <div>
      Product Type: {product.productType} <br/>
      Description: {product.description} <br/>
      Id: {product.productId}
        <button onClick={() => console.warn(product.productId)}>Info</button>
        <button onClick={() => console.warn(product.productId)}>Update</button>
        <button onClick={() => handleButton('delete')}>Delete</button>
    </div>
  )
}
