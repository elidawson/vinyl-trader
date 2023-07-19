import { useState, useContext, useEffect } from 'react'
import { UserContext } from './App'
import RecordCard from './RecordCard';
import CommentCard from './CommentCard';
import UserEdit from './UserEdit';

export default function UserDetail() {
    const user = useContext(UserContext);
    const [ favorites, setFavorites ] = useState([]);
    const [ records, setRecords ] = useState([]);
    const [ comments, setComments ] = useState([]);
    const [ show, setShow ] = useState('records');
    const [ edit, setEdit ] = useState(false);
    const toggleEdit = () => setEdit((prev) => !prev);

    useEffect(() => {
        fetch(`/api/users/${user.id}`)
        .then(res => res.json())
        .then((data) => {
            setFavorites(data.favorites);
            setRecords(data.records);
            setComments(data.comments);
        })    
    }, []);

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
                {records.map((record) => {
                    return(
                        <RecordCard
                            key={record.id}
                            record={record}
                            setFavorites={setFavorites}
                        />
                    )
                })}
            </div>
        )}
        {show === 'favorites' && (
            <div className='record-container'>
                <h2>user favorites:</h2>
                {favorites.map((favorite) => {
                    return(
                        <RecordCard
                            key={favorite.record.id}
                            record={favorite.record}
                            setFavorites={setFavorites}
                        />
                    )
                })}
            </div>
        )}
        {show === 'comments' && (
            <div className='record-container'>
                <h2>user comments:</h2>
                {comments.map((comment) => {
                    return(
                        <CommentCard
                            key={comment.id}
                            comment={comment}
                        />
                    )
                })}
            </div>
        )}
    </>
    )
}
