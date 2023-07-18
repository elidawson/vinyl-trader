import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useContext } from 'react';
import { UserContext } from "./App"

export default function RecordForm({ user }) {
  // const user = useContext(UserContext);
  // const userId = user.id
  const navigate = useNavigate();

  const formSchema = yup.object({
    title: yup.string(),
    artist: yup.string(),
    description: yup.string(),
    image: yup.string(),
    user_id: yup.number()
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      artist: '',
      description: '',
      image: '',
      user_id: user.id
    },
    validationSchema: formSchema,
    onSubmit: (values, actions) => {
      fetch('/api/records', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      })
      .then((res) => res.json())
      .then(() => {
        actions.resetForm()
        navigate('/')
      })
      .catch(error => alert(error))
    }
  });

  return (
    <form className='record-form' onSubmit={formik.handleSubmit}>
      <h1>add record</h1>
      <label>title</label>
      <input value={formik.values.title} onChange={formik.handleChange} type='text' name='title' /><br/>
      <label>artist</label>
      <input value={formik.values.artist} onChange={formik.handleChange} type='text' name='artist' /><br/>
      <label>description</label>
      <input value={formik.values.description} onChange={formik.handleChange} type='text' name='description' /><br/>
      <label>image</label>
      <input value={formik.values.image} onChange={formik.handleChange} type='text' name='image' /><br/>
      <button type='submit'>submit</button>
    </form>
  )
}