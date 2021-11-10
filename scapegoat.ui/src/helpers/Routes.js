import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../Views/HomeView';
import Products from '../Views/ProductViews/Products';
import SingleProductView from '../Views/ProductViews/SingleProductView';
import Orders from '../Views/OrderViews/Orders';
import AllUserList from '../Views/AdminViews/AllUserList';
import CartView from '../Views/CartViews/CartView';
import OrderView from '../Views/OrderViews/OrderView';
import SearchResults from '../Views/SearchViews/SearchResults';
import MerchantDashboardView from '../Views/UserViews/Dashboards/MerchantDashboardView';
import SinglePaymentView from '../Views/PaymentView/SinglePaymentView';
import Payments from '../Views/PaymentView/Payments';
import DashRouter from '../Views/UserViews/Dashboards/DashRouter';
import PleaseLogin from '../Views/UserViews/PleaseLogin';

export default function Routes({user, products, setProducts, users, setUsers, payments, setPayments}) {
  return (
    <div>
      <Switch>
      {/* Public Views */}
        <Route exact path='/' component={Home} />
        <Route exact path='/products' component={() => <Products />} />
        <Route exact path='/products/:id' component={SingleProductView}/>
        <Route exact path='/merchants' component={MerchantDashboardView}/>
        <Route exact path='/search' component={SearchResults}/>
        <Route exact path='/pleaseLogin' component={PleaseLogin}/>
      {/* User Views */}
        <PrivateRoute exact path='/orders' user={user} component={() => <Orders user={user} /> }/>
        <PrivateRoute exact path='/users' user={user} component={() => <AllUserList users={users} setUsers={setUsers}/>} />
        <PrivateRoute exact path='/dashboard' user={user} component={() => <DashRouter firebaseUser={user}/>} />
        <PrivateRoute exact path='/cart' user={user} component={CartView}/>
        <PrivateRoute exact path='/users/:id/order' user={user} component={OrderView}/>
        <PrivateRoute exact path='/payments' user={user} component={() => <Payments />} />
        <PrivateRoute exact path='/payments/:id' user={user} component={SinglePaymentView} />
      {/* Admin Views */}
     </Switch>
    </div>
  )
}

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const routeChecker = (taco) => (user
    ? (<Component {...taco} user={user}/>)
    : (<Redirect to={{ pathname: '/pleaseLogin', state: { from: taco.location } }} />));

  return <Route {...rest} render={(props) => routeChecker(props)}/>;
};

// eslint-disable-next-line no-lone-blocks
{/* <Route exact path='/search/:term' component={(props) => <SearchResults {...props}/>} /> */}
