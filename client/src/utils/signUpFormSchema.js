import * as yup from 'yup'

export const signUpFormSchema = yup.object().shape({
  first_name: yup.string()
    .required('first name is required'),
  last_name: yup.string()
    .required('last name is required'),
  role: yup.string()
    .oneOf(['owner','renter'], 'role is required'),
  email: yup.string()
    .required('username is required')
    .min(3, 'username must be 3 characters long'),
  password: yup.string()
    .required('password is required')
    .min(3, 'password must be 3 characters long'),
})
