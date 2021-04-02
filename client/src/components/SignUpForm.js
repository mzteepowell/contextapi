import React, { useState, useEffect } from 'react'  
import * as yup from 'yup'
import { signUpFormSchema } from '../utils/signUpFormSchema';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initialFormValues = {
    userrole:{
        userroleid: 0,
        userroletype: "",
    },
    username: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
  }

const initialFormErrors = { 
  userrole:{
        userroleid: 0,
        userroletype: "",
    },
    username: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
}

const initialDisabled = true;

export default function SignUpForm() {

  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled);
  const { push } = useHistory();

  const signUpUser = (newUser) => {
    axios
    .post('https://usemytechstuff-tt26.herokuapp.com/users/user', newUser)
    .then(res => {
      console.log(res.data)
      setFormValues(initialFormValues)
      push('/login')
    })
    .catch(err => {
      console.log(err.response)
    })
  }

   useEffect(() => {
        signUpFormSchema.isValid(formValues).then(valid => {
          console.log(valid)
          return setDisabled(!valid)}
     )
   }, [formValues])
  
  const onSubmit = (evt) => {
    evt.preventDefault();
    signUpUser(finalForm)
  }

  const inputChange = (name, value) => {
    // const { name, value } = evt.target
    // console.log(evt.target.name, evt.target.value)

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
        value,
    })
  }
  const onChange = evt => {
    const { name, value } = evt.target;
    inputChange(name, value);
  }

  const owner = {
    userrole: {
      userroleid: 1,
      userroletype: "OWNER"
    }
  }
  const renter = {
    userrole: {
      userroleid: 2,
      userroletype: "RENTER"
    }
  }
  
  let finalForm;
  if (formValues.userrole === "1") {
    finalForm = { ...formValues, ...owner };
  }
  else if (formValues.userrole === "2") {
    finalForm = { ...formValues, ...renter };
  }

    return (
      <div>
        <form className="form container" onSubmit={onSubmit}>
          <div>
            <label className='form-row' >
              <input
                type="text"
                onChange={onChange}
                placeholder="First Name"
                name="fname"
                value={formValues.fname}
              />
              {formErrors.fname}
            </label>
            <label className='form-row'>
              <input
                type="text"
                onChange={onChange}
                placeholder="Last Name"
                name="lname"
                value={formValues.lname}
              />
            </label>
            <label className='form-row'>
              <input
                type="text"
                onChange={onChange}
                placeholder="Username"
                name="username"
                value={formValues.username}
              />
              {formErrors.username}
            </label>
            <label className='form-row'>
              <input
                type="email"
                onChange={onChange}
                placeholder="E-mail"
                name="email"
                value={formValues.email}
              />
            </label>
            <label className='form-row'>
              <input
                type="password"
                onChange={onChange}
                placeholder="Password"
                name="password"
                value={formValues.password}
              />
              {formErrors.password}
            </label >
            
            <label className='form-row' >
              <p>Account Role </p>
              <select name="userrole" value={formValues.userrole} onChange={onChange}>
                <option value="none">----Select----</option>
                <option value={1}>OWNER</option>
                <option value={2}>RENTER</option>
              </select>
              {formErrors.userrole.type}
            </label>
          </div>
          <div>
          </div>
          <div className='form-button'>
            <button disabled={disabled}>Sign Up</button>
          </div>
        </form>
      </div>
    )
  }
