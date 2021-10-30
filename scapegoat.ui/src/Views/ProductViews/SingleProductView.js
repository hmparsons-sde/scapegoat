import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import SingleProduct from '../../Components/Products/SingleProduct';
import { getSingleProduct} from '../../helpers/data/productData';

export default function SingleProductView() {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getSingleProduct(id).then(data => setProduct(data));
  }, [id]);
  return <div><SingleProduct product={product}></SingleProduct></div>;
}

SingleProduct.propTypes = {
  id: PropTypes.string,
};
