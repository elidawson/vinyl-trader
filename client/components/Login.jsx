import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

function Login({ setUser }) {
    const navigate = useNavigate();

    const formSchema = yup.object({
        username: yup.string(),
        password: yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: formSchema,
        onSubmit: (values, actions) => {
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            body: JSON.stringify(values),
            })
            .then((res) => res.json())
            .then((data) => {
                actions.resetForm();
                setUser(data);
                navigate('/');
            })
            .catch(error => alert(error))
        }
    });
    return (
        <>
            <form className='form' onSubmit={formik.handleSubmit}>
                <h1>login</h1>
                <label>username</label>
                <input value={formik.values.username} onChange={formik.handleChange} type='text' name='username' /><br/>
                <label>password</label>
                <input value={formik.values.password} onChange={formik.handleChange} type='password' name='password' /><br/>
                <input type='submit' value='login' className='button' />
            </form>
            <p>don't have an account?</p>
            <Link to='/signup'className='button'>signup</Link>
        </>
    )
}

export default Login