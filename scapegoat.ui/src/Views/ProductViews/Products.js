import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button } from 'reactstrap';
import ProductCard from '../../Components/Products/ProductCard';
import ProductForm from '../../Components/Products/ProductForm';
import { getAllProducts } from '../../helpers/data/productData';

const Products = () => {
    const history = useHistory();
    const [products, setProducts] = useState([]);
    const [addProduct, setAddProduct] = useState(false);
  
    useEffect(() => { 
      getAllProducts().then((response) => {
        setProducts(response);
      });
    }, [products]);

    const handleHistory = (route) => {
      history.push(route);
    };
  
    return (
      <div> 
        <nav className='product-header'>
          <h1>
            {
              addProduct
              ? 'Add a Product'
              : 'Product Catgories'
            }
            
          </h1>
          <div className='product-header-filter'>
            <div className='filter-buttons'>
              {
                addProduct
                ? <Button onClick={() => setAddProduct(!addProduct)}>Cancel</Button>
                : <Button outline onClick={() => setAddProduct(!addProduct)}>Add Product</Button>
              }
            </div>
          </div>
        </nav>
          {
            addProduct
            ?
                <ProductForm
                  setAddProduct={setAddProduct}
                  setProducts={setProducts}
                />
      
      : <div className='d-flex flex-column'>
          <div className='category-header'>
            <h2>
              Single Goats ({products.filter(goat => goat.productType === 'Single').length})
            </h2>
            <div className='filter-buttons'>
              <Button className='' outline onClick={() => handleHistory('/products/category/Single')}>
                See All
              </Button>
            </div>
          </div>
          <div className='product-category-container'>
            {
              products.length > 0
              ? products.filter(goat => goat.productType === 'Single').slice(0, 3).map((prod, i) => (
                  <ProductCard
                    key={i}
                    productId={prod.productId}
                    productType={prod.productType}
                    description={prod.description}
                    merchantId={prod.merchantId}
                    price={prod.price}
                    size={prod.size}
                    createdAt={prod.createdAt.split('T')[0]}
                    setProducts={setProducts} />))
              : ''
            }
          </div>
          <div className='category-header'>
            <h2>
              Small Herds ({products.filter(goat => goat.productType === 'SmallHerd').length})
            </h2>
            <div className='filter-buttons'>
              <Button outline onClick={() => handleHistory('/products/category/SmallHerd')}>
                See All
              </Button>
            </div>
          </div>
          <div className='product-category-container'>
            {
              products.length > 0
              ? products.filter(goat => goat.productType === 'SmallHerd').slice(0, 3).map((prod, i) => (
                <ProductCard
                  key={i}
                  productId={prod.productId}
                  productType={prod.productType}
                  description={prod.description}
                  merchantId={prod.merchantId}
                  price={prod.price}
                  size={prod.size}
                  createdAt={prod.createdAt.split('T')[0]}
                  setProducts={setProducts} />))
              : ''
            }
          </div>
          <div className='category-header'>
            <h2>
              Large Herds ({products.filter(goat => goat.productType === 'LargeHerd').length})
            </h2>
            <div className='filter-buttons'>
              <Button outline onClick={() => handleHistory('/products/category/LargeHerd')}>
                See All
              </Button>
            </div>
          </div>
          <div className='product-category-container'>
            {
              products.length > 0
              ?  products.filter(goat => goat.productType === 'LargeHerd').slice(0, 3).map((prod, i) => (
                <ProductCard
                    key={i}
                    productId={prod.productId}
                    productType={prod.productType}
                    description={prod.description}
                    merchantId={prod.merchantId}
                    price={prod.price}
                    size={prod.size}
                    createdAt={prod.createdAt.split('T')[0]}
                    setProducts={setProducts} />))
              : ''
            }
          </div>
        </div>
        }
      </div>
    )
};

export default Products;