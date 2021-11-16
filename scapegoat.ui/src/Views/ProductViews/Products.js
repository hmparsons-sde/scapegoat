import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import ProductCard from '../../Components/Products/ProductCard';
import ProductForm from '../../Components/Products/ProductForm';
import SearchBar from '../../Components/Search/SearchBar';
import { getAllProducts } from '../../helpers/data/productData';
import { getUserByFBKey } from '../../helpers/data/userData';

const Products = ({ firebaseUser }) => {
    const history = useHistory();
    const [products, setProducts] = useState([]);
    const [addProduct, setAddProduct] = useState(false);
    const [user, setUser] = useState({});
    const [search, setSearch] = useState(false);
  
    useEffect(() => { 
      getAllProducts().then((response) => {
        setProducts(response);
      });
    }, [products]);

    useEffect(() => {
      getUserByFBKey(firebaseUser?.uid).then(setUser);
  
    },[firebaseUser.uid])

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
              <Button outline onClick={() => setSearch(!search)}>Search</Button>
              <Modal isOpen={search}>
                <ModalHeader>
                  Search for Products
                </ModalHeader>
                <ModalBody>
                  <SearchBar />
                </ModalBody>
                <ModalFooter>
                  <Button onClick={() => setSearch(false)}>Search</Button>
                  <Button onClick={() => setSearch(false)}>Cancel</Button>
                </ModalFooter>
              </Modal>
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
                    user={user}
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
