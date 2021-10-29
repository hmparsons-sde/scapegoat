import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Views/HomeView';
import ProductList from '../Components/Products/ProductList';
// import SingleProduct from '../Components/Products/SingleProduct';
import SingleProductView from '../Views/ProductViews/SingleProductView';
import UserList from '../Components/Users/UserList';
import Payments from '../Views/PaymentView/Payments';

export default function Routes({products, setProducts, users, setUsers}) {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/products' component={() => <ProductList products={products} setProducts={setProducts}/>} />
        <Route exact path='/products/:id' component={SingleProductView}/>
        <Route exact path='/users' component={() => <UserList users={users} setUsers={setUsers}/>} />
        <Route exact path='/payments' component={Payments}/>
      </Switch>
    </div>
  )
}
