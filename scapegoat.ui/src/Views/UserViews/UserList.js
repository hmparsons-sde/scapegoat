import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { getAllUsers } from "../../helpers/data/userData";
import SellerCard from "../../Components/Users/Sellers/SellerCard";

const SellersContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-top: 5%;
`;

export default function UserList() {

  const [users, setUsers] = useState([]);

  useEffect(() => getAllUsers().then(data => 
    setUsers(data)), []);

    let SingleSeller = users?.map(user => (<SellerCard user={user}></SellerCard>));

    return (
    <SellersContainer>
        {SingleSeller}
    </SellersContainer>
   );
}
