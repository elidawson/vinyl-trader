import { useContext } from 'react';
import '../stylesheets/commentcard.css';
import { UserContext } from './App';
import { useLocation } from 'react-router';

export default function CommentCard({ comment }) {
  const user = useContext(UserContext);
  const location = useLocation();

  return (
    <div className='comment-card'>
      <p>{comment.body}</p>
      {location.pathname === "/" && (
        <p>user: {comment.user.username}</p>
      )}
      {location.pathname === "/user" && (
        <>
          <p>album: {comment.record.title}</p>
          <p>artist: {comment.record.artist}</p>
        </>
      )}
      {comment.user_id === user.id && <button className='button'>Delete</button>}
    </div>
  );
}
