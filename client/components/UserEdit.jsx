import { useContext } from 'react'
import { useNavigate } from 'react-router';
import { UserContext } from './App'
import { useFormik } from 'formik';
import * as yup from 'yup';

export default function UserEdit({ toggleEdit, setCurrUser }) {
    const user = useContext(UserContext);
    const navigate = useNavigate()

    const formSchema = yup.object({
        username: yup.string(),
        name: yup.string(),
        location: yup.string(),
        image: yup.string(),
        bio: yup.string()
    });

    const formik = useFormik({
        initialValues: {
            username: user.username,
            name: user.name,
            location: user.location,
            image: user.image,
            bio: user.bio
        },
        validationSchema: formSchema,
        onSubmit: (values, actions) => {
            const nonEmptyValues = {};
            Object.entries(values).forEach(([key, value]) => {
                if (value.trim() !== '') {
                    nonEmptyValues[key] = value;
                }
            });

            fetch(`/api/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nonEmptyValues)
            })
            .then((res) => res.json())
            .then((data) => {
                setCurrUser(data)
                toggleEdit()
            })
            .catch(error => alert(error));
        }        
    });

    return (
        <form className='record-form' onSubmit={formik.handleSubmit}>
            <h1>edit profile</h1>
            <label>username</label><br/>
            <input value={formik.values.username} onChange={formik.handleChange} type='text' name='username' /><br/>
            <label>name</label><br/>
            <input value={formik.values.name} onChange={formik.handleChange} type='text' name='name' /><br/>
            <label>location</label><br/>
            <input value={formik.values.location} onChange={formik.handleChange} type='text' name='location' /><br/>
            <label>bio</label><br/>
            <input value={formik.values.bio} onChange={formik.handleChange} type='text' name='bio' /><br/>
            <button className='button' type='submit'>save changes</button>
            <button className='button' onClick={() => navigate('/user')}>cancel changes</button>
    </form>
    )
}
