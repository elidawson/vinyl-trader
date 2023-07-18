import '../stylesheets/commentcard.css'

export default function CommentCard({ comment }) {
  return (
    <div className='comment-card'>
        <p>{comment.body}</p>
        <p>{comment.record.title}</p>
        <p>{comment.user.username}</p>
    </div>
  )
}
