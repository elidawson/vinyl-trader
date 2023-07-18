import '../stylesheets/recordcard.css'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState, useContext, useEffect } from 'react'
import { UserContext } from './App'
import CommentCard from './CommentCard';

export default function RecordCard({ record }) {
  const user = useContext(UserContext);
  const [ show, setShow ] = useState(false);
  const [ comments, setComments ] = useState([]);
  const [ likes, setLikes ] = useState([])
  const [ userLiked, setUserLiked ] = useState(false);
  const toggleShow = () => setShow((prev) => !prev);

  useEffect(() => {
    setComments(record.comments);
    setLikes(record.favorites);
    if (record.favorites.some((favorite) => favorite.user_id === user.id)) {
      setUserLiked(true);
    }
  }, []);

  const addLike = () => {
    if (!userLiked) {
      setUserLiked(true);
      fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: user.id, record_id: record.id })
        })
        .then((res) => res.json())
        .then((data) => {
          setLikes((prev) => [...prev, data])
        })
    }
  };

  const deleteLike = () => {
    const userLike = likes.find((favorite) => favorite.user_id === user.id);
    fetch(`/api/favorites/${userLike.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setLikes((prevLikes) => prevLikes.filter((like) => like.id !== userLike.id));
        setUserLiked(false);
      })
      .catch((error) => console.error('Delete Error:', error));
  };

  return (
    <div className='record-card'>
      <img className='record-image' src={record.image} alt='record-image' />
      <div className='container'>
        <div className='record-title'>
          <p>posted by: {record.user.username}</p>
          <h2>{record.title}</h2>
          <h2>{record.artist}</h2>
          <p>{record.description}</p>
        </div>
        <div className='favs'>
          <button className='button' onClick={toggleShow}>💬</button>
          <p>{comments.length}</p><br/>
          { userLiked ? (
            <>
              <p>favorited!</p>
              <button className='button' onClick={deleteLike}>✔️</button>
            </>
          ) : (
            <button className='button' onClick={addLike}>❤️</button>
          )}
          <p>{likes.length}</p>
        </div>
        { show ? (
          <div>
            <CommentForm record={record} setComments={setComments} />
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
              ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function CommentForm({ record, setComments }) {
  const user = useContext(UserContext);

  const formSchema = yup.object({
    body: yup.string(),
    user_id: yup.number(),
    record_id: yup.number()
  });

  const formik = useFormik({
    initialValues: {
      body: '',
      user_id: user.id,
      record_id: record.id
    },
    validationSchema: formSchema,
    onSubmit: (values, actions) => {
      fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      })
      .then((res) => res.json())
      .then((data) => {
        actions.resetForm()
        console.log(data);
        setComments((prev) => [...prev, data])
      })
      .catch(error => alert(error))
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input 
        value={formik.values.body}
        onChange={formik.handleChange}
        type='text' name='body'
        placeholder='add a comment...'
      />
      <button type='submit'>post</button>
    </form>
  )
}
