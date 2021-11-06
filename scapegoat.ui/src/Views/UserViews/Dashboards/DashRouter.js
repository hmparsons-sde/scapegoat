import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { getSingleUser } from '../../../helpers/data/userData';
import CustomerDashboardView from './CustomerDashboardView';
import MerchantDashboardView from './MerchantDashboardView';

export default function DashRouter() {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getSingleUser(id).then(data => setUser(data));
  }, [id]);

  console.warn(user);
  
  const sellerStatus = user.userType === "Merchant";
  return (
    <div>
      {sellerStatus 
      ? <MerchantDashboardView user={user} />
      : <CustomerDashboardView user={user} />
    }
    </div>
  )
}
