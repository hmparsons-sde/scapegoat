import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../Views/HomeView';
import ProductList from '../Components/Products/ProductList';
import SingleProductView from '../Views/ProductViews/SingleProductView';
import Orders from '../Views/OrderViews/Orders';
import UserList from '../Views/UserViews/UserList';
import SingleUserView from '../Views/UserViews/UserView';
import CartView from '../Views/CartViews/CartView';
import OrderView from '../Views/OrderViews/OrderView';
import SearchResults from '../Views/SearchViews/SearchResults';

export default function Routes({products, setProducts, users, setUsers}) {
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
        <Route exact path='/search' component={SearchResults}/>
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
