import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { getSingleProduct} from '../../helpers/data/productData';
import { getUserByFBKey } from '../../helpers/data/userData';

export default function SingleProductView({ firebaseUser }) {
  const [singleProduct, setSingleProduct] = useState({});
  const [date, setDate] = useState('');
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    getSingleProduct(id).then(data => {
      setSingleProduct(data);
      setDate(data.createdAt.split('T'));
    });
  }, [id]);

  useEffect(() => {
    getUserByFBKey(firebaseUser?.uid).then(setUser);

  },[firebaseUser.uid])


  return (
    <div>
      <h1>{singleProduct.description}</h1>
      <h2>{singleProduct.price} per day</h2>
      <h2>Quantity: {singleProduct.size}</h2>
      <h2>Created on {date[0]}</h2>
      <Button onClick={() =>  console.warn('added to cart')}>Add to Cart</Button>
    </div>
  );
}
