import React from "react";
import { useHistory } from "react-router";
// import { Button } from "reactstrap";
import styled from 'styled-components';

const SellerIDCard = styled.div`
  width: 300px;
  height: auto;
  margin: 15px;
  border-style: solid;
  box-shadow: 50px;
`;

const ViewSellerButton = styled.div`
  background-color: #e7e7e7;
  color: black;
  font-weight: bold;
  border: solid;
  padding: 15px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin-bottom: 15px;
`;

export default function SellerCard({user}) {

  const history = useHistory();
  const handleClick = () => {
    history.push(`users/${user.id}`);
  };

  console.log(user);
  return (
  <SellerIDCard>
    <div>
    <h4 tag="h4" className='mt-1'>{user.firstName} {user.lastName}</h4>
      <h5>User Type: {user.userType}</h5>
      <h5>Customer Tier: {user.customerTier}</h5>
      <ViewSellerButton className='btn-md mr-1 ml-5 p-2' color="danger" onClick={() => handleClick()}>View {user.firstName}</ViewSellerButton>
    </div>
    </SellerIDCard>
  )
}
