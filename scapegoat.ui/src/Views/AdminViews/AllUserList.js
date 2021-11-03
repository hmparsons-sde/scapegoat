import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
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
`;

const UserFormModal = styled.div`
.customOverlay {
  background: rgba(36, 123, 160, 0.7) !important;
}
.customModal {
  background: $bgcolor;
  max-width: 400px;
  width: 100%;
}

#userInfoFormModal {
  border-radius: 25px;
}
`;

export default function AllUserList() {

  const [users, setUsers] = useState([]);
  // const [showButton, setShowButton] = useState(false);
  // const handleClick = () => {
  //   setShowButton((prevState) => !prevState);
  // };
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const closeIcon = (
    <p>X</p>
  );

  useEffect(() => getAllUsers().then(data => 
    setUsers(data)), []);

    let SingleSeller = users?.map(user => (<SellerCard user={user} setUsers={setUsers}></SellerCard>));

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
        <UserFormModal>
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
        </UserFormModal>
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
