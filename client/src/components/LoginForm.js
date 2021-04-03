import React, { useState, useEffect, useContext } from 'react'
import * as yup from 'yup'
import formSchema from '../utils/formSchema'
import { useHistory } from 'react-router-dom'
import { NewProductContext, ProductContext } from '../contexts/ProductContext';
import axios from 'axios';
import axiosWithAuth from '../utils/axiosWithAuth';

const initialFormValues = {
  username: '',
  password: '',
}

const initialFormErrors = {
  username: '',
  password: '',
}

const initialDisabled = true

export default function LoginForm() {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)
  const { setIsLoggedIn } = useContext(ProductContext)
  const { push } = useHistory();

  const update = (name, value) => {
    yup
      .reach(formSchema, name) // get to this part of the schema
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

  useEffect(() => {
        formSchema.isValid(formValues).then(valid => setDisabled(!valid))
      }, [formValues])

  const onSubmit = (evt) => {
    evt.preventDefault();
    axios
          .post(
            "https://usemytechstuff-tt26.herokuapp.com/login",
            `grant_type=password&username=${formValues.username}&password=${formValues.password}`, 
            {
              headers: {
                Authorization: `Basic ${btoa("lambda-client:lambda-secret")}`,
                "Content-Type": "application/x-www-form-urlencoded",
              },
            },
          )
          .then((res) => {
            // console.log("res.data log:", res.data);
            setIsLoggedIn(true);
            localStorage.setItem("token", res.data.access_token);
            localStorage.setItem("name", formValues.username);
            push("/products");
            // console.log(localStorage.getItem("name"));
          })
          .catch((err) => console.log({err}))
  }

  const change = (evt) => {
        const { name, value } = evt.target;
        update(name, value);
  };
  
    const getUsers = ()  => {
    axiosWithAuth().get('users/user')
      .then(res => {
        console.log(res.data)
        console.log(res.data.data)
    })
  }
  getUsers();
  
  return (
    <div>
      <form className="form container" onSubmit={onSubmit}>
        <div>
          <label>
            Username:
            <input
              value={formValues.username}
              onChange={change}
              name="username"
              type="text"
            />
            {formErrors.username}
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              value={formValues.password}
              onChange={change}
              name="password"
              type="password"
            />
            {formErrors.password}
          </label>
        </div>
        <div>
          <button id="submitBtn"
          disabled={disabled}>Log In</button>
        </div>
      </form>
    </div>
  )

}