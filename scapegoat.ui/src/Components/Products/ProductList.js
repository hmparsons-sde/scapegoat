import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../helpers/data/productData";
import SingleProduct from "./SingleProduct";

export default function ProductList() {

  const [products, setProducts] = useState([]);
  
  useEffect(() => getAllProducts().then(data => 
    setProducts(data)), []);

    let SingleProducts = products?.map(product => (<SingleProduct product={product}></SingleProduct>));

    return (
    <div>
        {SingleProducts}
    </div>
    )
}
