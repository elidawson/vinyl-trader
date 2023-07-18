import { useState, useContext } from 'react'
import { UserContext } from './App'
import RecordCard from './RecordCard';
import CommentCard from './CommentCard';
import UserEdit from './UserEdit';

export default function UserDetail() {
    const user = useContext(UserContext);
    const [ show, setShow ] = useState('');
    const [ edit, setEdit ] = useState(false);
    const toggleEdit = () => setEdit((prev) => !prev);

    const userRecords = user.records.map(record => {
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
        { !edit ? (
            <div>
            <h2>{user.name}</h2>
            <p>{user.username}</p>
            <p>{user.location}</p>
            <p>{user.bio}</p>
            <img src={user.image} alt='user-image'></img>
            <button className='button' onClick={toggleEdit}>edit profile</button>
        </div>
        ) : (
            <UserEdit toggleEdit={toggleEdit} />
        )}
        <button className='button' onClick={() => setShow('records')}>user records</button>
        <button className='button' onClick={() => setShow('favorites')}>user favorites</button>
        <button className='button' onClick={() => setShow('comments')}>user comments</button>
        {show === 'records' && (
            <div className='record-container'>
                <h2>user records:</h2>
                {userRecords}
            </div>
        )}
        {show === 'favorites' && (
            <div className='record-container'>
                <h2>user favorites:</h2>
                {userFavorites}
            </div>
        )}
        {show === 'comments' && (
            <div className='record-container'>
                <h2>user comments:</h2>
                {userComments}
            </div>
        )}
    </>
    )
}
