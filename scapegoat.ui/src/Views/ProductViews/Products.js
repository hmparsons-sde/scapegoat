import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import ProductCard from '../../Components/Products/ProductCard';
import ProductForm from '../../Components/Products/ProductForm';
import { getAllProducts } from '../../helpers/data/productData';
import { getUserByFBKey } from '../../helpers/data/userData';

const Products = ({ firebaseUser }) => {
    const history = useHistory();
    const [products, setProducts] = useState([]);
    const [addProduct, setAddProduct] = useState(false);
    const [user, setUser] = useState({});
  
    useEffect(() => { 
      getAllProducts().then((response) => {
        setProducts(response);
      });
    }, [products.length]);


    useEffect(() => {
      getUserByFBKey(firebaseUser?.uid).then(setUser);
  
    },[firebaseUser.uid])

    const handleHistory = (route) => {
      history.push(route);
    };
  
    return (
      <div> 
        <ProductCategoryContainer>
        <nav className='product-header'>
          <ProductHeader>
          <h1>
            {
              addProduct
              ? 'Add a Product'
              : 'Product Categories'
            }
            
          </h1>
          </ProductHeader>
          <div className='product-header-filter'>
            <div className='filter-buttons'>
              {
                addProduct
                ? <Button onClick={() => setAddProduct(!addProduct)}>Cancel</Button>
                : <AddProductButton outline onClick={() => setAddProduct(!addProduct)}>
                  <div className="button_slide slide_down">
                  Add Product
                  </div>
                  </AddProductButton>
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
              <AddProductButton className='' outline onClick={() => handleHistory('/products/category/Single')}>
              <div className="button_slide slide_down">
                See All
                </div>
              </AddProductButton>
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
                    user={user}
                    setProducts={setProducts} />))
              : ''
            }
          </div>
          <div className='category-header'>
            <h2>
              Small Herds ({products.filter(goat => goat.productType === 'SmallHerd').length})
            </h2>
            <div className='filter-buttons'>
              <AddProductButton outline onClick={() => handleHistory('/products/category/SmallHerd')}>
              <div className="button_slide slide_down">
                See All
              </div>
              </AddProductButton>
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
                  user={user}
                  setProducts={setProducts} />))
              : ''
            }
          </div>
          <div className='category-header'>
            <h2>
              Large Herds ({products.filter(goat => goat.productType === 'LargeHerd').length})
            </h2>
            <div className='filter-buttons'>
              <AddProductButton outline onClick={() => handleHistory('/products/category/LargeHerd')}>
              <div className="button_slide slide_down">
                See All
              </div>
              </AddProductButton>
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
                    user={user}
                    setProducts={setProducts} />))
              : ''
            }
          </div>
        </div>
        }
        </ProductCategoryContainer>
      </div>
    )
};

export default Products;

const AddProductButton = styled.div`
.button_slide {
  color: black;
  border: 2px solid #e7e7e7;
  border-radius: 0px;
  padding: 18px 36px;
  display: inline-block;
  font-size: 14px;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: inset 0 0 0 0 #e7e7e7;
  -webkit-transition: ease-out 0.4s;
  -moz-transition: ease-out 0.4s;
  transition: ease-out 0.4s;
}
.slide_down:hover {
  box-shadow: inset 0 100px 0 0 #e7e7e7;
}
align-content: center;
margin-top: 10px;
margin-bottom: 15px;
`;
const ProductHeader = styled.div`
h1 {
  font-weight: 400;
  line-height: 1.2;
  margin-top: 5%;
  margin-bottom: 5%;
}
`;
const ProductCategoryContainer = styled.div`
h1, h2, h3, h4, h5, p {
  font-weight: 300;
  line-height: 1.2;
}
margin-bottom: 25%;
background-color: #FDF1E9;
`;
