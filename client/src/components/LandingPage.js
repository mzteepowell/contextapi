import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
// import EditItemForm from './EditItemForm';
// import AddItemForm from './AddItemForm';
// import UserDashboard from './UserDashboard';
// import RentPage from './RentPage';
// import Navbar from './Navbar';
// import ItemListings from './ItemListings';


const LandingPage = () => {

  return (
  <div>
    {/* <FormContext.Provider value={{user, formValues, formErrors, postNewItem}}> */}
    <Navbar />
      <Switch>
        <Route exact path='/'>
          <Redirect to='/login'/>
        </Route>
        <Route path='/login' component={LoginForm}/>
        <Route path='/signup' component={SignUpForm}/>
        {/* <PrivateRoute path='/users' component={UserDashboard}/>
        <PrivateRoute exact path='/items' component={ItemListings}/>
        <PrivateRoute exact path='/renters' component={RentPage}/>
        <PrivateRoute exact path='/renters/edit-item' component={EditItemForm}/>
        <PrivateRoute exact path='/renters/add-item' component={AddItemForm}/> */}
    </Switch>
    {/* </FormContext.Provider> */}
  </div>
  )
}
export default LandingPage;