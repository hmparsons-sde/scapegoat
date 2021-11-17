import React, { useState } from 'react';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import { getProductsByName } from '../../helpers/data/productData';
import ProductCard from '../Products/ProductCard';

const SearchBarElement = styled.div`
  input[type=text] {
    margin-top: 25px;
    padding: 12px;
    font-size: 15px;
    border: solid;
    background-color: #f3f3f3;
    align-content: center;
    width: 50%;
    border-radius: 25px;
    border-color: #7f7f7f;
  }

  input[type=text]:hover {
    background: #f1f1f1;
  }
`;

export default function SearchBar() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    setSearchResults([]);
    getProductsByName(e.target.value).then(r => {
      setSearchResults(r)
    });
  };
  
    return (
      <>
          <SearchBarElement>
            <form>
              <input 
                type='text' 
                name='text' 
                placeholder='Search for Goats...' 
                className='search-input' 
                autoComplete='off'
                onKeyUp={e => handleSearch(e)}
              />
            </form>
          </SearchBarElement>
           <div className='product-category-container'>
           {
             searchResults.length > 0
             ? searchResults.map((prod, i) => (
               <ProductCard
                 key={i}
                 productId={prod.productId}
                 productType={prod.productType}
                 description={prod.description}
                 merchantId={prod.merchantId}
                 price={prod.price}
                 size={prod.size}
                 createdAt={prod.createdAt.split('T')[0]}
               />
             ))
             : ''
          }
         </div>
      </>
    );
  }
