import React from 'react';
import styled from 'styled-components';

const FooterElement = styled.div`
  text-align: center;
  padding: 10px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  margin-top: 25%;
  color: grey;

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
