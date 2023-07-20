import '../stylesheets/recordcard.css'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocation } from 'react-router';
import { useState, useContext, useEffect } from 'react'
import { UserContext } from './App'
import CommentCard from './CommentCard';

export default function RecordCard({ record, setUserFavorites }) {
  const user = useContext(UserContext);
  const location = useLocation()
  const [ commentsRecord, setCommentsRecord ] = useState([]);
  const [ likes, setLikes ] = useState([])
  const [ userLiked, setUserLiked ] = useState(false);
  const [ show, setShow ] = useState(false);
  const toggleShow = () => setShow((prev) => !prev);

  useEffect(() => {
    setCommentsRecord(record.comments);
    setLikes(record.favorites);
    if (user) {
      if (record.favorites.some((favorite) => favorite.user_id === user.id)) {
        setUserLiked(true);
      }
    }
  }, [user]);

  const addLike = () => {
    setUserLiked(true);
    fetch('/api/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: user.id, record_id: record.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (location.pathname === '/users') {
          setUserFavorites((prev) => [...prev, data]);
        } 
        if (location.pathname === '/') {
          setLikes((prev) => [...prev, data]);
        }
      })
      .catch((error) => console.error('Add Like Error:', error));
  };

  const deleteLike = async () => {
    try {
      setUserLiked(false);
      const userLike = await findUserLike();
      if (userLike) {
        await fetch(`/api/favorites/${userLike.id}`, {
          method: 'DELETE',
        });
        console.log('userLike:', userLike);
        console.log('location.pathname:', location.pathname);
        if (location.pathname === '/user') {
          setUserFavorites((prev) => prev.filter((favorite) => favorite.id !== userLike.id));
        }  
        if (location.pathname === '/') {
          setLikes((prevLikes) => prevLikes.filter((like) => like.id !== userLike.id));
        }
  
      } else {
        console.log('User like not found.');
      }
    } catch (err) {
      console.error('Error removing like:', err);
    }
  };
  
  
  const findUserLike = () => {
    return new Promise((resolve, reject) => {
      const userLike = likes.find((like) => like.user_id === user.id);
      if (userLike) {
        resolve(userLike);
      } else {
        reject(new Error('User like not found.'));
      }
    });
  };
  

  return (
    <div className='record-card'>
        <div className='flex-this'>
        <img className='record-image' src={record.image} alt='record-image' />
        <div className='info-container'>
          <div className='record-title'>
            <h2 className='record-title'>{record.title}</h2>
            <h2 className='record-artist'>{record.artist}</h2>
            <p className='record-description'>{record.description}</p>
            <p className='record-user'>posted by: {record.user.username}</p>
          </div>
          <div className='favs'>
            <button className='button' onClick={toggleShow}>💬 {commentsRecord.length}</button>
            {userLiked ? (
              <>
                <button className='button' onClick={deleteLike}>
                  ✔️ favorited! {likes.length}
                </button>
              </>
            ) : user ? (
              <button className='button' onClick={addLike}>
                ❤️ {likes.length}
              </button>
            ) : (
              <button className='button'>
                ❤️ {likes.length}
              </button>
            )}
          </div>
          </div>
        </div>
      { show ? (
        <div className='comment-container'>
          {user && <CommentForm record={record} setComments={setCommentsRecord} />}
          <div className='comments'>
            {commentsRecord.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
              ))}
          </div>
        </div>
      ) : null}
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
        // className='comment-input'
      /><br/>
      <button className='small-button' type='submit'>post comment</button>
    </form>
  )
}
