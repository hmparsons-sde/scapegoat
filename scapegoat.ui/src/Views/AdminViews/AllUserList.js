import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { getAllUsers } from "../../helpers/data/userData";
import SellerCard from "../../Components/Users/Sellers/SellerCard";
import UserInfoForm from "../../Components/Forms/UserForms/UserInfoForm";

const AllUsersContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-top: 5%;
`;

const AdminUserHeader = styled.div`
  h1 {
    font-weight: 400;
    line-height: 1.2;
    margin-top: 5%;
  }
`;

export default function AllUserList() {

  const [users, setUsers] = useState([]);

  useEffect(() => getAllUsers().then(data => 
    setUsers(data)), []);

    let SingleSeller = users?.map(user => (<SellerCard user={user}></SellerCard>));

    return (
      <div>
        <AdminUserHeader>
        <h1>All Users</h1>
        </AdminUserHeader>
        <UserInfoForm/>
        <AllUsersContainer>
            {SingleSeller}
        </AllUsersContainer>
      </div>
   );
}

// AllUserList.propTypes = {
//   firstName: PropTypes.string,
//   lastName: PropTypes.string,
//   id: PropTypes.any,
//   createdAt: PropTypes.any,
//   customerTier: PropTypes.any,
//   userType: PropTypes.any
// }
