import React, { useState } from "react";
import { Button } from "reactstrap";
import { deleteProduct, getSingleProduct } from "../../helpers/data/productData";
import ProductForm from "./ProductForm";

export default function ProductCard({
  productId, 
  productType, 
  description, 
  merchantId, 
  price,
  size,
  createdAt,
  setProducts
}) {
  const [update, setUpdate] = useState(false);

  const handleButton = (p) => {
    switch (p) {
      case 'delete': 
        deleteProduct(productId).then(r => setProducts(r));
      break;
      case 'update':
        setUpdate(!update)
      break;
      case 'single':
        getSingleProduct(productId).then(r => console.warn(r));
      break;
      default:
      break;
    }
  };

  return (
    <div>
      Product Type: {productType} <br/>
      Description: {description} <br/>
        <Button onClick={() => handleButton('single')}>Info</Button>
        <Button onClick={() => handleButton('update')}>Update</Button>
        <Button onClick={() => handleButton('delete')}>Delete</Button>
      {
        update
        ? <ProductForm 
            productId={productId}
            productType={productType}
            description={description}
            merchantId={merchantId}
            price={price}
            size={size}
            createdAt={createdAt}
          />
        : ''
      }
    </div>
  )
}
