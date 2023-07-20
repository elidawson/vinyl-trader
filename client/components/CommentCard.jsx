import { useState, useContext } from "react";
import { useLocation } from "react-router";
import { UserContext } from "./App";
import "../stylesheets/commentcard.css";

export default function CommentCard({ comment, setUserComments }) {
  const user = useContext(UserContext);
  const location = useLocation();

  const [editMode, setEditMode] = useState(false);
  const [updatedText, setUpdatedText] = useState(comment.body);

  const handleCommentDelete = (commentId) => {
    fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    })
      .then(() => {
        setUserComments((prev) =>
          prev.filter((comment) => comment.id !== commentId)
        );
      })
      .catch((error) => console.error("Delete Error:", error));
  };

  const handleCommentEdit = (commentId) => {
    fetch(`api/comments/${commentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body: updatedText }), // Only update the 'body' property of the comment
    })
      .then((res) => res.json())
      .then((updatedComment) => {
        // Update the comment locally in the state
        setUserComments((prev) =>
          prev.map((comment) =>
            comment.id === commentId ? { ...comment, body: updatedText } : comment
          )
        );
      })
      .catch((error) => {
        console.error("Error updating comment:", error);
      });
    setEditMode(false);
  };

  return (
    <div className="comment-card">
      {editMode ? (
        <div>
          <textarea
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
          />
          <button className="button" onClick={() => handleCommentEdit(comment.id)}>
            Save
          </button>
        </div>
      ) : (
        <>
          <p>{comment.body}</p>
          {location.pathname === "/" && <p>user: {comment.user.username}</p>}
          {location.pathname === "/user" && (
            <>
              <p>album: {comment.record.title}</p>
              <p>artist: {comment.record.artist}</p>
            </>
          )}
          {user && (
            <>
              {comment.user_id === user.id && (
                <button className="small-button" onClick={() => setEditMode(true)}>
                  edit comment
                </button>
              )}
              {comment.user_id === user.id && (
                <button
                  className="small-button"
                  onClick={() => handleCommentDelete(comment.id)}
                >
                  delete comment
                </button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
