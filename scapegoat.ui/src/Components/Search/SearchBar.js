import React from 'react';
import styled from 'styled-components';

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
     return (
      <SearchBarElement>
        <form>
          <input type='text' name='text' placeholder='Search for Goats...' className='search-input' autoComplete='off'/>
        </form>
      </SearchBarElement>
     );
   }
