import React from "react";
import { useHistory } from "react-router";
import styled from 'styled-components';
import moment from 'moment';
import { getAllUsers, hardDeleteUser, softDeleteUser } from "../../../helpers/data/userData";
import { AiOutlineDelete, AiOutlineEyeInvisible } from "react-icons/ai";

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

const StyledRemoveDelete = styled.div`
  cursor: pointer;
`;

const StyledRemoveArchive = styled.div`
  cursor: pointer;
`;

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
      <StyledRemoveDelete>
        <p onClick={() => handleClick('delete')}>Delete <AiOutlineDelete /></p>
      </StyledRemoveDelete>
      <StyledRemoveArchive>
        <p onClick={() => handleClick('remove')}>Archive <AiOutlineEyeInvisible /></p>
      </StyledRemoveArchive>
      <hr/>
      <br/>
    </div>
    </SellerIDCard>
  )
}
