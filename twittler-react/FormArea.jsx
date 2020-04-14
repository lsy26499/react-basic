import React, { useState, useRef } from "react";
import TweetArea from "./TweetArea";

const FormArea = ({ DATA }) => {
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const [data, setData] = useState([...DATA].reverse());
  const inputEl = useRef(null);
  const commentEl = useRef(null);

  const onChangeInput = (e) => {
    setUserName(e.target.value);
  };

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const onSubmitButton = (e) => {
    e.preventDefault();
    let date = new Date();
    if (userName !== "" && comment !== "") {
      setData((prevData) => {
        return [
          {
            user: userName,
            message: comment,
            created_at: date.format(),
          },
          ...prevData,
        ];
      });
      setUserName("");
      inputEl.current.focus();
      setComment("");
    } else {
      console.log("트윗을 입력해주세요");
    }
  };

  return (
    <>
      <form id="write-comment-wrapper">
        <span className="form-span">UserName</span>
        <input
          ref={inputEl}
          type="text"
          name="username"
          id="write-username"
          value={userName}
          onChange={onChangeInput}
        />
        <span className="form-span">Comment</span>
        <textarea
          ref={commentEl}
          name="comment"
          id="write-comment"
          value={comment}
          onChange={onChangeComment}
        ></textarea>
        <button id="submit-button" onClick={onSubmitButton}>
          Tweet!
        </button>
      </form>
      <TweetArea data={data} />
    </>
  );
};

export default FormArea;
