import React, { useState } from 'react'
import axiosWithAuth from '../utils/axiosWithAuth';
import * as yup from 'yup'
import { signUpFormSchema } from '../utils/signUpFormSchema';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initialFormValues = {
  first_name: '',
  last_name: '',
  role: '',
  email: '',
  password: '',
}

const initialFormErrors = {
  first_name: '',
  last_name: '',
  role: '',
  email: '',
  password: '',
}

export default function SignUpForm() {

  const [user, setUser] = useState(initialFormValues)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const { push } = useHistory();

  
  const onChange = (evt) => {
    const { name, value } = evt.target
    console.log(evt.target.name, evt.target.value)

    yup
      .reach(signUpFormSchema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });

    setFormValues({
      ...formValues, 
      [name]:
        //Check for checkboxes
        evt.target.type === 'checkbox' ? evt.target.checked :
          value,
    })
  }

  const signUpUser = (newUser) => {
    axios
      .post('https://reqres.in/api/users', newUser)
      .then(res => {
        console.log(res.data)
        setUser(res.data)
        setFormValues(initialFormValues)
        push('/login')
      })
      .catch(err => {
        console.log(err.response)
      })
    }
  const onSubmit = (evt) => {
    evt.preventDefault();
    
    const newUser = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      role: formValues.role,
      email: formValues.email.trim(),
      password: formValues.password.trim(),
    }
    
    signUpUser(newUser)
    // // call to API

    // console.log(newUser)
  }
  console.log(user)
  return (
    <div>
      <form className="form container" onSubmit={onSubmit}>
      <div>
          <label>
            First Name:
            <input
              value={formValues.first_name}
              onChange={onChange}
              name="first_name"
              type="text"
            />
            {formErrors.first_name}
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input
              value={formValues.last_name}
              onChange={onChange}
              name="last_name"
              type="text"
            />
            {formErrors.last_name}
          </label>
        </div>
        <div>
          <label>
            Role
            <select onChange={onChange} value={formValues.role} name="role">
              <option value="">-- Select an Option --</option>
              <option value="owner">Owner</option>
              <option value="renter">Renter</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              value={formValues.email}
              onChange={onChange}
              name="email"
              type="text"
            />
            {formErrors.email}
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              value={formValues.password}
              onChange={onChange}
              name="password"
              type="password"
            />
            {formErrors.password}
          </label>
        </div>
        <div>
          <button id="submitBtn">Sign Up</button>
        </div>
      </form>
    </div>
  )

}