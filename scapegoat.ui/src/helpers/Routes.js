import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Views/HomeView';
import ProductList from '../Components/Products/ProductList';
import SingleProductView from '../Views/ProductViews/SingleProductView';
import Orders from '../Views/OrderViews/Orders';
import UserList from '../Components/Users/UserList';
import SingleUserView from '../Views/UserViews/UserView';
import CartView from '../Views/CartViews/CartView';
import OrderView from '../Views/OrderViews/OrderView';
import SinglePaymentView from '../Views/PaymentView/SinglePaymentView';
import PaymentList from '../Components/Payments/PaymentList';

export default function Routes({products, setProducts, users, setUsers, payments, setPayments}) {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/products' component={() => <ProductList products={products} setProducts={setProducts}/>} />
        <Route exact path='/products/:id' component={SingleProductView}/>
        <Route exact path='/orders' component={Orders}/>
        <Route exact path='/users' component={() => <UserList users={users} setUsers={setUsers}/>} />
        <Route exact path='/users/:id' component={() => <SingleUserView users={users} setUsers={setUsers}/>} />
        <Route exact path='/users/:id/cart' component={CartView}/>
        <Route exact path='/users/:id/order' component={OrderView}/>
        <Route exact path='/payments' component={() => <PaymentList payments={payments} setPayments={setPayments}/>}/>
        <Route exact path='/payments/:id' component={() => <SinglePaymentView payments={payments} setPayments={setPayments}/>} />
     </Switch>
    </div>
  )
}
