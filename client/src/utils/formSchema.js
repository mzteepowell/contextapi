import * as yup from 'yup';

const formSchema = yup.object().shape({
    username: yup.string()
        .required('Username is required'),
    password: yup.string()
        .required('Password is required')
})

export default formSchema
