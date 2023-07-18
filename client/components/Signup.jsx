import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as yup from 'yup';

function Signup() {
    const navigate = useNavigate()

  const formSchema = yup.object({
    username: yup.string(),
    password: yup.string()
  })

  const formik = useFormik({
    initialValues: {
        username: '',
        password: ''
    },
    validationSchema: formSchema,
    onSubmit: (values, actions) => {
        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
        .then((res) => res.json())
        .then(() => {
        actions.resetForm()
        navigate('/')
        })
        .catch(error => alert(error))
    }
  })


    return (
        <>
            <form className='form' onSubmit={formik.handleSubmit}>
                <h1>signup</h1>
                <label>username</label>
                <input value={formik.values.username} onChange={formik.handleChange} type='text' name='username' /><br/>
                <label>password</label>
                <input value={formik.values.password} onChange={formik.handleChange} type='password' name='password' /><br/>
                <input type='submit' value='signup' className='button' />
            </form>
            <p>already have and account?</p>
            <Link to='/login' className='button'>login</Link>
        </>
    )
}

export default Signup