import React from "react";

export default function SellerCard({user}) {
  console.log(user);
  return (
    <div>
      Name: {user.firstName} {user.lastName}<br/>
      User Type: {user.userType} <br/>
    </div>
  )
}
