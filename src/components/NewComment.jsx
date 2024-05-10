import React from "react";

const NewComment = ({ comment, showInput }) => {
  
  return (
    <div>
      <div>
        {showInput ? (
          <div>
            <input />
            <button>Send</button>
          </div>
        ) : (
          <div>{comment.message}</div>
        )}
      </div>
      <div style={{paddingLeft:"25px"}}>
        {comment.items.map((item) => {
          return <NewComment comment={item} />;
        })}
      </div>
    </div>
  );
};

export default NewComment;
