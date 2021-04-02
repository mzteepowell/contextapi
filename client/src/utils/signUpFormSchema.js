import * as yup from 'yup'

export const signUpFormSchema = yup.object().shape({
  fname: yup
  .string("First character of first name should begin with a letter")
  .trim()
  .max(50, "Maximum characters allowed are 50")
  .required('First name is required'),
  
  lname: yup
  .string()
  .trim()
  .max(50, "First character of last name should begin with a letter")
  .required('Last name is required'),

  username: yup
  .string()
  .trim()
  .min(8, 'Invalid! Username must be at least 8 characters')
  .max(18, "Maximum characters allowed are 18")
  .required('Username is required'),
  
  email: yup
  .string()
  .email("Invalid email")
  .required('Email is required'),

  password: yup
  .string()
  .min(8, 'Invalid! Password must be at least 8 characters')
  .max(23, "Maximum characters allowed are 23")
  .required('Password is required')
  .matches( /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&*]{8,23}$/,
  "Password must contain contain one uppercase, one lowercase, one number and one special character"),

  userrole: yup
  .string()
  .required("Required")
})
