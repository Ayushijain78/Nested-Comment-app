import { useEffect, useState } from "react";
import "./App.css";
import Comments from "./components/Comments";
import useCustomHook from "./hooks/useCustomHook";
import "./components/test.js";

const comment = {
  id: 1,
  items: [
    {
      id: 2,
      message: "hello",
      items: [
        {
          id: 33,
          message: "bye!!",
          items:[]
        },
        {
          id: 332,
          message: "bye22!!",
          items:[]
        },
      ],
    },
    {
      id: 222,
      message: "hello",
      items: [
        {
          id: 32223,
          message: "bye!!",
          items:[]
        },
        {
          id: 332222,
          message: "bye22!!",
          items:[]
        },
      ],
    },
  ],
};

function App() {
  const [commentsData, setCommentsData] = useState(comment);
  const { insertComment, deleteComment, editComment } = useCustomHook();

  const handleDeleteComment = (commentId) => {
    const updatedComments = deleteComment(commentsData, commentId);
    const newcomm = { ...updatedComments };
    localStorage.setItem("comments", JSON.stringify(newcomm));
    setCommentsData(newcomm);
  };
  const handleEditComment = (commentId, message) => {
    const updatedComments = editComment(commentsData, commentId, message);
    const newcomm = { ...updatedComments };
    localStorage.setItem("comments", JSON.stringify(newcomm));
    setCommentsData(newcomm);
  };
  const handleAddComment = (commentId, message) => {
    const getAddedComments = insertComment(commentsData, commentId, message);
    const newcomm = { ...getAddedComments };
    localStorage.setItem("comments", JSON.stringify(newcomm));
    setCommentsData(newcomm);
  };
  useEffect(() => {
    setCommentsData(JSON.parse(localStorage.getItem("comments")) || comment);
  }, []);
  return (
    <div className="App">
      <Comments
        handleDeleteComment={handleDeleteComment}
        comment={commentsData}
        handleAddComment={handleAddComment}
        handleEditComment={handleEditComment}
      />
    </div>
  );
}

export default App;
