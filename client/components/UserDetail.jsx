import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "./App";
import RecordCard from "./RecordCard";
import CommentCard from "./CommentCard";
import UserEdit from "./UserEdit";
import "../stylesheets/userdetail.css";

export default function UserDetail({ handleLogout }) {
  const navigate = useNavigate()
  const user = useContext(UserContext);
  const [currUser, setCurrUser] = useState(null);
  const [userFavorites, setUserFavorites] = useState([]);
  const [userRecords, setUserRecords] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [show, setShow] = useState("records");
  const [edit, setEdit] = useState(false);
  const toggleEdit = () => setEdit((prev) => !prev);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/users/${user.id}`);
        const data = await response.json();
        setCurrUser(data);
        setUserFavorites(data.favorites);
        setUserRecords(data.records);
        setUserComments(data.comments);
      } 
      catch (error) {
        // console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [user]);

  const handleClick = () => {
    handleLogout();
    navigate("/");
  };


  return (
    <div className="user-detail-container">
      {currUser && (
        <div>
          {!edit ? (
              <div className="user-container">
                <h2>{currUser.name}</h2>
                <p>
                  username:
                  <br />
                  {currUser.username}
                </p>
                <p>
                  location:
                  <br />
                  {currUser.location}
                </p>
                <p>
                  bio:
                  <br />
                  {currUser.bio}
                </p>
                <button className="small-button" onClick={toggleEdit}>
                  edit profile
                </button>
                <button className="small-button" onClick={handleClick}>
                  logout
                </button>
              </div>
          ) : (
            <UserEdit toggleEdit={toggleEdit} setCurrUser={setCurrUser} />
          )}
          <p>show:</p>
          <select
            className="view-select"
            onChange={(e) => setShow(e.target.value)}
          >
            <option value="records">user records</option>
            <option value="favorites">user favorites</option>
            <option value="comments">user comments</option>
          </select>
          {show === "records" && (
            <div className="record-container">
              <h2>user records:</h2>
              {userRecords.map((record) => (
                <RecordCard
                  key={record.id}
                  record={record}
                  setUserFavorites={setUserFavorites}
                />
              ))}
            </div>
          )}
          {show === "favorites" && (
            <div className="record-container">
              <h2>user favorites:</h2>
              {userFavorites.map((favorite) => (
                <RecordCard
                  key={favorite.record.id}
                  record={favorite.record}
                  setUserFavorites={setUserFavorites}
                />
              ))}
            </div>
          )}
          {show === "comments" && (
            <>
              <h2>user comments:</h2>
              <div className="comment-container">
                {userComments.map((comment) => (
                  <CommentCard
                    key={comment.id}
                    comment={comment}
                    setUserComments={setUserComments}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
