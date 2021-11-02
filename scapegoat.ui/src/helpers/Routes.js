import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Views/HomeView';
import Products from '../Views/ProductViews/Products';
import SingleProductView from '../Views/ProductViews/SingleProductView';
import Orders from '../Views/OrderViews/Orders';
import UserList from '../Components/Users/UserList';
import SingleUserView from '../Views/UserViews/UserView';
import CartView from '../Views/CartViews/CartView';
import OrderView from '../Views/OrderViews/OrderView';

export default function Routes({products, setProducts, users, setUsers}) {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/products' component={() => <Products />} />
        <Route exact path='/products/:id' component={SingleProductView}/>
        <Route exact path='/orders' component={Orders}/>
        <Route exact path='/users' component={() => <UserList users={users} setUsers={setUsers}/>} />
        <Route exact path='/users/:id' component={() => <SingleUserView users={users} setUsers={setUsers}/>} />
        <Route exact path='/users/:id/cart' component={CartView}/>
        <Route exact path='/users/:id/order' component={OrderView}/>
     </Switch>
    </div>
  )
}
