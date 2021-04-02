import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { data } from './products';
import axios from 'axios';
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
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useCart([]);
	console.log(cart)

  useEffect(()=>{
    axios.get('http://localhost:5000/api/products')
			.then(res => {
				console.log(res.data)
        setProducts(res.data);
      })
      .catch(err => {
        console.log(err);
      });
	}, []);
	
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
						<Route exact path="/products">
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
