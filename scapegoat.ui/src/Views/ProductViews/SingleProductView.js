import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleProduct} from '../../helpers/data/productData';
import ProductCard from '../../Components/Products/ProductCard';

export default function SingleProductView() {
  const [singleProduct, setSingleProduct] = useState({});
  const [date, setDate] = useState('');
  const { id } = useParams();

  useEffect(() => {
    getSingleProduct(id).then(data => {
      setSingleProduct(data);
      setDate(data.createdAt.split('T'));
    });
  }, [id]);

  return (
    <div>
      <ProductCard 
        productId={singleProduct.productId}
        productType={singleProduct.productType}
        description={singleProduct.description}
        merchantId={singleProduct.merchantId}
        price={singleProduct.price}
        size={singleProduct.size}
        createdAt={date[0]}
      />
    </div>
  );
}

