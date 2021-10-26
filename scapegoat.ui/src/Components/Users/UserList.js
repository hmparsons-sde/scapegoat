import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../helpers/data/userData";
import SellerCard from "./Sellers/SellerCard";

export default function UserList() {

  const [users, setUsers] = useState([]);
  
  useEffect(() => getAllUsers().then(data => 
    setUsers(data)), []);

    let SingleSeller = users?.map(user => (<SellerCard user={user}></SellerCard>));

    return (
    <div>
        {SingleSeller}
    </div>
    )
}
