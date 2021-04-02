import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import { data } from './products';
import axios from 'axios';
import axiosWithAuth from './utils/axiosWithAuth';
import { CartContext } from './contexts/CartContext';
import { ProductContext } from './contexts/ProductContext'
import PrivateRoute from './components/PrivateRoute';
import Navigation from './components/Navigation';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';
import SellersDashboard from './components/SellersDashboard';
import useCart from './hooks/useCart';
import AddItemForm from './components/AddItemForm';

function App() {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useCart([]);
	const [, setIsLoggedIn] = useState(false)

	const logout = () => {
    axiosWithAuth()
      .post('/logout')
      .then(res => {
      console.log(res)
        localStorage.removeItem('token');
        window.location.href = '/login';
      })
      .catch(err => {
      console.log(err.response)
    })
  };
	
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

	console.log(products);
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
			<ProductContext.Provider value={{ products, setProducts, addItem, setIsLoggedIn}}>

				<CartContext.Provider value={{cart, removeItem}}>
					<Navigation logout={logout}/>
					{/* Routes */}
					<Switch>
						<Route exact path='/'>
							<Redirect to='/login'/>
						</Route>
						<Route path='/login' component={LoginForm}/>
						<Route path='/signup' component={SignUpForm}/>
						<PrivateRoute exact path="/products">
							{/* <Products /> */}
							<Products products={products} addItem={addItem} />
						</PrivateRoute>
						<PrivateRoute path="/cart">
							<ShoppingCart />
						</PrivateRoute>
						<PrivateRoute exact path='/sellers'>
							<SellersDashboard/>
							</PrivateRoute>
						<PrivateRoute path='/sellers/add' >
							<AddItemForm/>
						</PrivateRoute>
					</Switch>
				</CartContext.Provider>
			</ProductContext.Provider>
		</div>
	);
}

export default App;
