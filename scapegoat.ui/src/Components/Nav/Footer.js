import React from 'react';
import styled from 'styled-components';

const FooterElement = styled.div`
  text-align: center;
  padding: 10px;
  left: 0;
  bottom: 0;
  width: 100%;
  margin-top: 40%;
  background-color: #FDF1E9;
  color: #4B4F3F;
  
  h4 {
    font-weight: 200;
    line-height: 1.2;
  }
`;

export default function Footer() {
  return (
    <FooterElement>
      <h4>scapegoat* © 2021 | *we are not liable for any incurred damages</h4>
    </FooterElement>
  );
}
