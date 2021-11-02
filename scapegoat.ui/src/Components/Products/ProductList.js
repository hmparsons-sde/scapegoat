import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { getAllProducts } from "../../helpers/data/productData";
import SingleProduct from "./SingleProduct";

const ProductsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-top: 5%;
`;

export default function ProductList() {

  const [products, setProducts] = useState([]);
  
  useEffect(() => getAllProducts().then(data => 
    setProducts(data)), []);

    let SingleProducts = products?.map(product => (<SingleProduct product={product}></SingleProduct>));

    return (
    <div>
      <ProductsContainer>
        {SingleProducts}
        </ProductsContainer>
    </div>
    )
}
