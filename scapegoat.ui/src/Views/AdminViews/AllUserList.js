import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { getAllUsers } from "../../helpers/data/userData";
import CustomerCard from "../../Components/Users/Customers/CustomerCard";
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

const UserFormButton = styled.div`
  .button_slide {
    color: black;
    border: 2px solid #e7e7e7;
    border-radius: 0px;
    padding: 18px 36px;
    display: inline-block;
    font-size: 14px;
    letter-spacing: 1px;
    cursor: pointer;
    box-shadow: inset 0 0 0 0 #e7e7e7;
    -webkit-transition: ease-out 0.4s;
    -moz-transition: ease-out 0.4s;
    transition: ease-out 0.4s;
  }
  .slide_down:hover {
    box-shadow: inset 0 100px 0 0 #e7e7e7;
  }
  align-content: center;
  margin-top: 10px;
`;

export default function AllUserList() {

  const [users, setUsers] = useState([]);

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const closeIcon = (
    <p>X</p>
  );

  useEffect(() => getAllUsers().then(data => 
    setUsers(data)), []);

    let SingleSeller = users?.map(user => (<CustomerCard user={user} setUsers={setUsers}></CustomerCard>));

    return (
      <div>
        <AdminUserHeader>
        <h1>All Users</h1>
        </AdminUserHeader>
        <UserFormButton onClick={onOpenModal}>
        <div className="button_slide slide_down">
          Add New User
        </div>
        </UserFormButton>
        <Modal
          id="userInfoFormModal"
          open={open}
          onClose={onCloseModal}
          center
          closeIcon={closeIcon}
          classNames={{
            overlay: 'customOverlay',
            modal: 'customModal',
          }}
        >
          <UserInfoForm/>
        </Modal>
        <AllUsersContainer>
          {SingleSeller}
        </AllUsersContainer>
      </div>
   );
}
