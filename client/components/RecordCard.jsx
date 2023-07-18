import '../stylesheets/recordcard.css'
import { useContext } from 'react'
import { UserContext } from './App'

export default function RecordCard({ record }) {
  const user = useContext(UserContext)
  
  function handleLike(){
    fetch('/api/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_id: user.id, record_id: record.id})
    })
    .then((res) => res.json())
  }

  return (
    <div className='record-card'>
      <img className='record-image' src={record.image} alt='record-image'></img>
      <div className='container'>
        <div className='record-title'>
          <p>posted by: {record.user.username}</p>
          <h2>{record.title}</h2>
          <h2>{record.artist}</h2>
          <p>{record.description}</p>
        </div>
        <div className='favs'>
          <button className='button'>💬</button>
          {/* <p>{record.comments.length}</p><br/> */}
          <button className='button' onClick={handleLike}>❤️</button>
          {/* <p>{record.favorites.length}</p> */}
        </div>
      </div>
    </div>
  )
}
