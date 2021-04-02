import React, { useState } from 'react'
import * as yup from 'yup'
import { signUpFormSchema } from '../utils/signUpFormSchema'
import { useHistory } from 'react-router-dom'
import axiosWithAuth from '../utils/axiosWithAuth';
import axios from 'axios';

const initialFormValues = {
  first_name: '',
  last_name: '',
  role: '',
  email: '',
  password: '',
}

const initialFormErrors = {
  email: '',
  password: '',
}

export default function LoginForm() {

  const [, setUser] = useState({})
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const { push } = useHistory();

  const onChange = (evt) => {
    const { name, value } = evt.target

    yup
      .reach(signUpFormSchema, name) // get to this part of the schema
      //we can then run validate using the value
      .validate(value) // validate this value
      .then(() => {
        // happy path and clear the error
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      // if the validation is unsuccessful, we can set the error message to the message
      // returned from yup (that we created in our schema)
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          // validation error from schema
          [name]: err.errors[0],
        });
      });

    setFormValues({
      ...formValues, 
      [name]: value,
    })
  }

  const loginUser = (newUser) => {
    axios
      .post('https://reqres.in/api/users', newUser)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        console.log(res.data)
        push('/products')
      })
      .catch(err=>{
        console.log(err);
      });
  }

  const onSubmit = (evt) => {
    evt.preventDefault();

    const newUser = {
      username: formValues.email.trim(),
      password: formValues.password.trim(),
    }

    // call to API
    loginUser(newUser)
    setUser(newUser)
    setFormValues(initialFormValues)
  }

  return (
    <div>
      <form className="form container" onSubmit={onSubmit}>
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
          <button id="submitBtn">Log In</button>
        </div>
      </form>
    </div>
  )

}