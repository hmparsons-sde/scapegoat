import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Views/HomeView';
import Products from '../Views/ProductViews/Products';
import SingleProductView from '../Views/ProductViews/SingleProductView';

export default function Routes({products, setProducts}) {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/products' component={() => <Products />} />
        <Route exact path='/products/:id' component={SingleProductView}/>
      </Switch>
    </div>
  )
}
