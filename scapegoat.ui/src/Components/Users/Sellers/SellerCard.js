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
  border-radius: 25px;
  border-color: #7f7f7f;
  font-weight: 400;

  img {
    object-fit: cover;
    width: 250px;
    height: 250px;
    margin-top: 20px;
    border-radius: 50%;
    margin-bottom: 20px;
  }

  hr {
    width: 50%;
  }
`;

const ViewSellerButton = styled.div`
  background-color: #e7e7e7;
  color: black;
  font-weight: 400;
  border: solid;
  border-color: #7f7f7f;
  border-radius: 10px;
  padding: 15px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin-bottom: 25px;
  margin-top: 10px;
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
    <img src='' alt='profile'></img> <br/> <hr/>
      <ViewSellerButton className='btn-md mr-1 ml-5 p-2' color="danger" onClick={() => handleClick()}>{user.firstName} {user.lastName}</ViewSellerButton>
    </div>
    </SellerIDCard>
  )
}
