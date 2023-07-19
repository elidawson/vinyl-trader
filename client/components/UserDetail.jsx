import '../stylesheets/userdetail.css'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from './App'
import RecordCard from './RecordCard';
import CommentCard from './CommentCard';
import UserEdit from './UserEdit';

export default function UserDetail() {
    const user = useContext(UserContext);
    const [ currUser, setCurrUser ] = useState(user)
    const [ favorites, setFavorites ] = useState([]);
    const [ records, setRecords ] = useState([]);
    const [ comments, setComments ] = useState([]);
    const [ show, setShow ] = useState('records');
    const [ edit, setEdit ] = useState(false);
    const toggleEdit = () => setEdit((prev) => !prev);

    useEffect(() => {
        if (user) {
            fetch(`/api/users/${user.id}`)
            .then(res => res.json())
            .then((data) => {
                setCurrUser(data);
                setFavorites(data.favorites);
                setRecords(data.records);
                setComments(data.comments);
            });
        }
    }, [user, favorites]);

    const handleCommentDelete = (commentId) => {
        fetch(`/api/comments/${commentId}`, {
            method: 'DELETE',
        })
        .then(() => {
            setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
        })
        .catch((error) => console.error('Delete Error:', error));
    };

    if (!currUser) {
        return null;
    }

    return (
    <>
        { !edit ? (
            <div className='user-detail'>
                <img className='user-image' src={user.image} alt='user-image'></img>
                <div>
                    <h2>{currUser.name}</h2>
                    <p>username:<br/>{currUser.username}</p>
                    <p>location:<br/>{currUser.location}</p>
                    <p>bio:<br/>{currUser.bio}</p>
                    <button className='button' onClick={toggleEdit}>edit profile</button>
                </div>
            </div>
        ) : (
            <UserEdit toggleEdit={toggleEdit} setCurrUser={setCurrUser} />
        )}
        <p>show:</p>
        <select className='view-select' onChange={(e) => setShow(e.target.value)}>
            <option value='records'>user records</option>
            <option value='favorites'>user favorites</option>
            <option value='comments'>user comments</option>
        </select>
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
            <>
            <h2>user comments:</h2>
            <div className='comment-container'>
                {comments.map((comment) => {
                    return(
                        <CommentCard
                            key={comment.id}
                            comment={comment}
                            handleCommentDelete={handleCommentDelete}
                        />
                    )
                })}
            </div>
            </>
        )}
    </>
    )
}
