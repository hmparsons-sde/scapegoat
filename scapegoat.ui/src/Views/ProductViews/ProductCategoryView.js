import React, { useEffect } from 'react'
import { useParams } from 'react-router'
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
        <h1>{pageTitle} ({categoryGoats.length})</h1>
    </nav>
        <div className='product-category-container p-2 justify-content-start'>
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
    </>
    )
}
