import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button } from "reactstrap";
import { deleteProduct } from "../../helpers/data/productData";
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
  const history = useHistory();

  const handleButton = (p) => {
    switch (p) {
      case 'delete': 
        deleteProduct(productId).then(r => setProducts(r));
      break;
      case 'update':
        setUpdate(!update)
      break;
      case 'single':
        history.push(`/products/${productId}`)
      break;
      default:
      break;
    }
  };

  return (
    <div className='product-card'>
      <h4>{description}</h4>
      <div className='product-info'>
        <h8>{productType}</h8>
        <h8>Price: {price}</h8>
        <h8>Size: {size}</h8>
        <h8>{createdAt}</h8>
        <Button onClick={() => handleButton('single')}>Info</Button>
        <Button onClick={() => handleButton('update')}>Update</Button>
        <Button onClick={() => handleButton('delete')}>Delete</Button>
        </div>
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
            setProducts={setProducts}
            update={update}
            setUpdate={setUpdate}
          />
        : ''
      }
    </div>
  )
}
