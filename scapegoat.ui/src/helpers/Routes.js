import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../Views/HomeView';
import Products from '../Views/ProductViews/Products';
import SingleProductView from '../Views/ProductViews/SingleProductView';
import Orders from '../Views/OrderViews/Orders';
import AllUserList from '../Views/AdminViews/AllUserList';
import CustomerDashboardView from '../Views/UserViews/Dashboards/CustomerDashboardView';
import CartView from '../Views/CartViews/CartView';
import OrderView from '../Views/OrderViews/OrderView';
import SearchResults from '../Views/SearchViews/SearchResults';
import SinglePaymentView from '../Views/PaymentView/SinglePaymentView';
import Payments from '../Views/PaymentView/Payments';

export default function Routes({products, setProducts, users, setUsers, payments, setPayments}) {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/products' component={() => <Products />} />
        <Route exact path='/products/:id' component={SingleProductView}/>
        <Route exact path='/orders' component={Orders}/>
        <Route exact path='/users' component={() => <AllUserList users={users} setUsers={setUsers}/>} />
        <Route exact path='/users/:id' component={() => <CustomerDashboardView users={users} setUsers={setUsers}/>} />
        <Route exact path='/users/:id/cart' component={CartView}/>
        <Route exact path='/users/:id/order' component={OrderView}/>
        <Route exact path='/search' component={SearchResults}/>
        <Route exact path='/payments' component={Payments}/>
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
