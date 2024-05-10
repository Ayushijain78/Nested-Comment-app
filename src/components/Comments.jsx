import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import Action from "./Action";

const Comments = ({
  comment,
  handleAddComment,
  handleDeleteComment,
  handleEditComment,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [editValue, setEditValue] = useState(comment.message);
  const [showInput, setShowInput] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef(null);
  const replyRef = useRef(null);
  
  const handleReply = () => {
    setShowInput(true);
    setInputValue("");
    setEditMode(false);
  };

  const onAddComment = () => {
    if (editMode) {
      setInputValue("");
      setShowInput(false);
      handleEditComment(comment.id, editValue);
    }
    if (inputValue.length > 1) {
      handleAddComment(comment.id, inputValue);
    }
    setInputValue("");
    setShowInput(false);
    setEditMode(false);
  };

  const onDeleteComment = () => {
    handleDeleteComment(comment.id);
  };
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);
 
  useEffect(()=>{
    replyRef?.current?.focus();
  },[])
  return (
    <div>
      <div className={comment.id === 1 ? "input-container" : "container"}>
        {comment.id === 1 ? (
          <div>
            <div className="input-cntr">
              <input
                ref={inputRef}
                type="text"
                className="input-box"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button className="add-btn" onClick={onAddComment}>
                Comment
              </button>
            </div>
          </div>
        ) : (
          <div className="comment-container">
            <div className="comment-cntr">
              <div className="comment-section">
                {editMode ? (
                  <div>
                    {
                      <div>
                        <input
                          type="text"
                          autoFocus
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                        />
                        <div className="flex">
                          <Action type="Edit" onclick={onAddComment} />
                          <Action
                            type="Cancel"
                            onclick={() => setEditMode(false)}
                          />
                        </div>
                      </div>
                    }
                  </div>
                ) : (
                  comment.message
                )}
              </div>
              {!editMode && (
                <div className="action-cntr">
                  <Action type="Reply" onclick={handleReply} />
                  <Action type="Edit" onclick={() => setEditMode(true)} />
                  <Action type="Delete" onclick={onDeleteComment} />
                </div>
              )}
            </div>

            {showInput ? (
              <div className="reply-box">
                <input autoFocus ref={replyRef} onChange={(e) => setInputValue(e.target.value)} />
                <div className="action-cntr">
                  <Action type="reply" onclick={onAddComment} />
                  <Action type="Cancel" onclick={() => setShowInput(false)} />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
        <div style={{ paddingLeft: "30px" }}>
          {comment.items.map((item) => {
            return (
              <Comments
                comment={item}
                handleAddComment={handleAddComment}
                handleDeleteComment={handleDeleteComment}
                handleEditComment={handleEditComment}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Comments;
