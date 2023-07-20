import { UserContext } from "./App"
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import '../stylesheets/forms.css'

export default function RecordForm() {
  const user = useContext(UserContext);
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
    <div className="form-container">
    <form className='form' onSubmit={formik.handleSubmit}>
      <h1>add record</h1>
      <label>title</label><br/>
      <input value={formik.values.title} onChange={formik.handleChange} type='text' name='title' autoComplete="off" /><br/>
      <label>artist</label><br/>
      <input value={formik.values.artist} onChange={formik.handleChange} type='text' name='artist' autoComplete="off" /><br/>
      <label>description</label><br/>
      <input value={formik.values.description} onChange={formik.handleChange} type='text' name='description' autoComplete="off" /><br/>
      <label>image</label><br/>
      <input value={formik.values.image} onChange={formik.handleChange} type='text' name='image' autoComplete="off" /><br/>
      <button className='button' type='submit'>submit</button>
    </form>
    </div>
  )
}
