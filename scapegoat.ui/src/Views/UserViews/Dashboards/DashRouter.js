import React, {useEffect, useState} from 'react'
import { getUserByFBKey } from '../../../helpers/data/userData';
import CustomerDashboardView from './CustomerDashboardView';
import MerchantDashboardView from './MerchantDashboardView';

export default function DashRouter({firebaseUser}) {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (firebaseUser.uid) {
      getUserByFBKey(firebaseUser.uid).then((response) => setUser(response));
    }
  }, [firebaseUser]);
  
  const sellerStatus = user.userType === "Merchant";
  return (
    <div>
      {sellerStatus 
      ? <MerchantDashboardView user={user} setUser={setUser} />
      : <CustomerDashboardView user={user} setUser={setUser} photoURL={firebaseUser.photoURL} firebaseKey={firebaseUser.uid} />
    }
    </div>
  )
}
