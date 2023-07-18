import { useContext } from 'react'
import { UserContext } from './App'
import RecordCard from './RecordCard';
import CommentCard from './CommentCard';

function UserDetail() {
    const user = useContext(UserContext);

    const userRecords = user.records.map(record => {
        console.log(record)
        return (
            <RecordCard
                key={record.id}
                record={record}
            />
        )
    })

    const userFavorites = user.favorites.map(favorite => {
        return (
            <RecordCard
                key={favorite.record.id}
                record={favorite.record}
            />
        )
    })

    const userComments= user.comments.map(comment => {
        return (
            <CommentCard
                key={comment.id}
                comment={comment}
            />
        )
    })

    return (
    <>
        <div>
            <h2>{user.name}</h2>
            <p>{user.username}</p>
            <p>{user.location}</p>
            <p>{user.bio}</p>
            <img src={user.image} alt='user-image'></img>
        </div>
        <h2>user records:</h2>
        <div className='record-container'>
            {userRecords}
        </div>
        <h2>user favorites:</h2>
        <div className='record-container'>
            {userFavorites}
        </div>
        <h2>user comments:</h2>
        <div>
            {userComments}
        </div>
    </>
    )
}

export default UserDetail