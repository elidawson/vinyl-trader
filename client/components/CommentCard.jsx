import '../stylesheets/commentcard.css'

function CommentCard({ comment }) {
  return (
    <div className='comment-card'>
        <p>{comment.body}</p>
        <p>{comment.record.title}</p>
    </div>
  )
}

export default CommentCard