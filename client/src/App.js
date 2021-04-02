import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {data} from './products';
import { CartContext } from './contexts/CartContext';
import { ProductContext } from './contexts/ProductContext'
import PrivateRoute from './components/PrivateRoute';
import Navigation from './components/Navigation';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';
import useCart from './hooks/useCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useCart([]);
	console.log(cart)

	const addItem = item => {
		// add the given item to the cart
		//console.log(item, cart)
		setCart([...cart, item])
	};

	const removeItem = item => {
		setCart(
			cart.filter(product => item.id !== product.id
		))
	}

	return (
		<div className="App">
			<ProductContext.Provider value={{ products, addItem }}>
				<CartContext.Provider value={{cart, removeItem}}>
					<Navigation />
					{/* Routes */}
					<Switch>
						<Route exact path='/'>
							<Redirect to='/login'/>
						</Route>
						<Route path='/login' component={LoginForm}/>
						<Route path='/signup' component={SignUpForm}/>
						<Route exact path="/items">
							<Products />
							{/* <Products products={products} addItem={addItem} /> */}
						</Route>
						<PrivateRoute path="/cart">
							<ShoppingCart />
						</PrivateRoute>
					</Switch>
				</CartContext.Provider>
			</ProductContext.Provider>
		</div>
	);
}

export default App;
