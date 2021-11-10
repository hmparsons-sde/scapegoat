import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleProduct} from '../../helpers/data/productData';
import ProductCard from '../../Components/Products/ProductCard';

export default function SingleProductView() {
  const [product, setProduct] = useState({});
  const [date, setDate] = useState('');
  const { id } = useParams();

  useEffect(() => {
    getSingleProduct(id).then(data => {
      setProduct(data);
      setDate(data.createdAt.split('T'));
    });
  }, [id]);

  return (
    <div>
      <ProductCard 
        productId={product.productId}
        productType={product.productType}
        description={product.description}
        merchantId={product.merchantId}
        price={product.price}
        size={product.size}
        createdAt={date[0]}
      />
    </div>
  );
}

