import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components';
import { useState } from 'react/cjs/react.development';
import ProductCard from '../../Components/Products/ProductCard';
import { getProductsByType } from '../../helpers/data/productData';

export const ProductCategoryView = () => {
    const { category } = useParams();
    const [pageTitle, setPageTitle] = useState('');
    const [categoryGoats, setCategoryGoats] = useState([]);
    
    useEffect(() => {
        getProductsByType(category).then(setCategoryGoats);
        
        if (category === 'Single') {
            setPageTitle('Single Goats')
        } else if (category === 'SmallHerd') {
            setPageTitle('Small Herds')
        } else if (category === 'LargeHerd') {
            setPageTitle('Large Herds')
        }
    }, [category])

    return (
    <>
    <nav className='product-header'>
        <ProductCategoryHeader>
        <h1>{pageTitle} ({categoryGoats.length})</h1>
        </ProductCategoryHeader>
    </nav>
    <SingleProductCategoryContainer>
        <div className='product-category-container p-2 justify-content-center'>
            { 
                categoryGoats.length > 0
                ? categoryGoats.map((prod, i) => (
                    <ProductCard
                        key={i}
                        productId={prod.productId}
                        productType={prod.productType}
                        description={prod.description}
                        merchantId={prod.merchantId}
                        price={prod.price}
                        size={prod.size}
                        createdAt={prod.createdAt.split('T')[0]}
                        setCategoryGoats={setCategoryGoats} />))
                : ''
            }
        </div>
    </SingleProductCategoryContainer>
    </>
    )
}
const ProductCategoryHeader = styled.div`
h1 {
  font-weight: 400;
  line-height: 1.2;
  margin-top: 5%;
  margin-bottom: 5%;
}
`;
const SingleProductCategoryContainer = styled.div`
h1, h2, h3, h4, h5, p {
  font-weight: 300;
  line-height: 1.2;
}
margin-bottom: 25%;
background-color: #FDF1E9;
`;
