import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import styled from 'styled-components';

// const SearchBarElement = styled.div`
//   input[type=text] {
//     margin-top: 25px;
//     padding: 12px;
//     font-size: 15px;
//     border: solid;
//     background-color: #f3f3f3;
//     align-content: center;
//     width: 50%;
//     border-radius: 25px;
//     border-color: #7f7f7f;
//   }

//   input[type=text]:hover {
//     background: #f1f1f1;

//   }
// `;

export default function SearchBar({ products, search, setSearch }) {
  const [searchName, setSearchName] = useState('');

  const handleSubmit = (query) => {
    console.warn(query);
  };
  
    return (
      <Modal isOpen={search}>
        <ModalHeader>
          Search for Products
        </ModalHeader>
        <ModalBody>
          <form>
            <input type='text' name='text' placeholder='Search for Goats...' className='search-input' autoComplete='off'/>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button outline onClick={() => handleSubmit(searchName)}>Search</Button>
          <Button outline onClick={() => setSearch(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
