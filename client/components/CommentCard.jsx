import { useContext } from 'react';
import '../stylesheets/commentcard.css';
import { UserContext } from './App';

export default function CommentCard({ comment }) {
  const user = useContext(UserContext);

  return (
    <div className='comment-card'>
      <p>{comment.body}</p>
      <p>album: {comment.record.title}</p>
      <p>artist: {comment.record.artist}</p>
      <p>{comment.user.username}</p>
      {comment.user_id === user.id ? <button>Delete</button> : null}
    </div>
  );
}
