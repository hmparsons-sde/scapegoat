import React from 'react';
import styled from 'styled-components';
import SearchBar from '../../Components/Search/SearchBar';

const SearchHeader = styled.div`
h1 {
  font-weight: 400;
  line-height: 1.2;
  margin-top: 5%;
}`;

export default function SearchResults() {
  return (
<div>
  <SearchHeader><h1>What would you like to find?</h1></SearchHeader>
    <SearchBar></SearchBar>
  </div>
  );
}
