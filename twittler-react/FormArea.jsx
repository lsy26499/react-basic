import React, { useState, useRef, memo } from "react";
import TweetArea from "./TweetArea";
import { generateNewTweet } from "./data";

const FormArea = ({ DATA }) => {
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const [data, setData] = useState([...DATA].reverse());
  const [filteredData, setFilterData] = useState([...data]);
  const [text, setText] = useState("check new tweet!");

  const inputEl = useRef(null);
  const commentEl = useRef(null);
  const checkBtn = useRef(null);

  let clickedUser = "";

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

  const onClickCheckButton = (e) => {
    if (text === "check new tweet!") {
      setData([generateNewTweet(), ...data]);
    } else if (checkBtn.current.textContent === "back") {
      setText("check new tweet!");
    }
  };

  const onClickUserName = (e) => {
    clickedUser = e.target.textContent;
    setFilterData([...data.filter((obj) => clickedUser === obj.user)]);
    setText("back");
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
      <div id="check-new-tweet">
        <button ref={checkBtn} onClick={onClickCheckButton} id="check-new-tweet-btn">
          {text}
        </button>
      </div>
      <TweetArea
        data={data}
        text={text}
        filteredData={filteredData}
        onClickUserName={onClickUserName}
      />
    </>
  );
};

export default FormArea;
