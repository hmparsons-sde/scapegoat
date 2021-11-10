import React from "react";
import { useHistory } from "react-router";
import styled from 'styled-components';
import moment from 'moment';
import { getAllUsers, hardDeleteUser, softDeleteUser } from "../../../helpers/data/userData";

const SellerIDCard = styled.div`
  width: 33%;
  height: auto;
  margin: 15px;
  padding: 10px;
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

// const ViewSellerButton = styled.div`
//   background-color: #e7e7e7;
//   color: black;
//   font-weight: 400;
//   border: solid;
//   border-color: #7f7f7f;
//   border-radius: 10px;
//   padding: 15px 15px;
//   text-align: center;
//   text-decoration: none;
//   display: inline-block;
//   font-size: 14px;
//   margin-bottom: 25px;
//   margin-top: 10px;
//   cursor: pointer;
// `;

export default function CustomerCard({user, setUsers}) {
  const history = useHistory();

  const handleClick = (type) => {
    switch (type) {
      case 'view':
      history.push(`users/${user.id}`);
      break;
      case 'remove':
        softDeleteUser(user.id, user).then(() => getAllUsers()).then(response => setUsers(response))
        break;
      case 'delete':
        hardDeleteUser(user.id).then(() => getAllUsers()).then(response => setUsers(response))
       break;
      default: console.warn(user);
    }
  };

  const date = moment.utc(user.createdAt).format();
  const local = moment.utc(date).local().format("dddd, MMMM Do YYYY, h:mm a");

  return (
  <SellerIDCard>
    <div>
        <p>{user.firstName} {user.lastName}</p>
        <p>Type: {user.userType}</p>
        <p>Tier: {user.customerTier}</p>
        <p>Created: {local}</p>
        <p>{user.addressLine1}, {user.addressLine2}, {user.cityName}, {user.state}, {user.country}</p>
      <hr/>
        <button onClick={() => handleClick('delete')}>Delete User</button>
        <button onClick={() => handleClick('remove')}>Remove User</button>
      <hr/>
      <br/>
    </div>
    </SellerIDCard>
  )
}
// eslint-disable-next-line no-lone-blocks
{/* <ViewSellerButton className='btn-md mr-1 ml-5 p-2' color="danger" onClick={() => handleClick('view')}>{user.firstName} {user.lastName}</ViewSellerButton> */}
