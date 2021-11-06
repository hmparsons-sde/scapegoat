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

export default function Routes({user, products, setProducts, users, setUsers, payments, setPayments}) {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/products' component={() => <Products />} />
        <Route exact path='/products/:id' component={SingleProductView}/>
        <Route exact path='/orders' component={() => <Orders user={user} /> }/>
        <Route exact path='/users' component={() => <AllUserList users={users} setUsers={setUsers}/>} />
        <Route exact path='/users/:id' component={() => <DashRouter users={users} setUsers={setUsers}/>} />
        <Route exact path='/users/:id/cart' component={CartView}/>
        <Route exact path='/users/:id/order' component={OrderView}/>
        <Route exact path='/merchants' component={MerchantDashboardView}/>
        <Route exact path='/search' component={SearchResults}/>
        <Route exact path='/payments' component={() => <Payments />} />
        <Route exact path='/payments/:id' component={SinglePaymentView} />
        <PrivateRoute/>
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
