import React, { useRef, useState, useEffect } from "react";
import Tweet from "./Tweet";
import { generateNewTweet } from "./data";

const TweetArea = ({ data }) => {
  // 가져온 데이터를 반복문 사용해 tweet에게 물려주기
  // 버튼의 textContent 물려주기

  // 버튼클릭 이벤트
  // 1. textContent가 check new tweet일 경우
  //  -> data의 항목들 뿌려주기
  // 2. back일 경우
  //  -> filteredData의 항목들 뿌려주기

  // filteredData의 경우는 tweet의 onClick 이벤트

  const [tweets, setTweets] = useState([...data]);
  const [filteredData, setFilterData] = useState([]);
  const buttonEl = useRef(null);
  let buttonText = "";
  let mounted = useRef(false);

  if (buttonEl.current) {
    buttonText = buttonEl.current.textContent;
  }

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (data.length !== tweets.length) {
        setTweets([...data]);
      }
      //data.length !== tweets.length ? setTweets([...data]) : tweets;
    }
  }, [data]);

  const onClickButton = (e) => {
    if (buttonText === "check new tweet!") {
      // 랜덤트윗
      setTweets([generateNewTweet(), ...tweets]);
    } else if (buttonText === "back") {
      // 뒤로가기
    }
  };

  const onClickUserName = (e) => {
    console.dir(e.target.textContent);
  };

  return (
    <>
      <div id="check-new-tweet">
        <button ref={buttonEl} onClick={onClickButton} id="check-new-tweet-btn">
          check new tweet!
        </button>
      </div>
      <div id="comments-wrapper">
        <div id="tweet-area">
          <ul id="tweet-list">
            {tweets.map((tweet, i) => {
              return <Tweet key={i} tweet={tweet} onClickUserName={onClickUserName} />;
            })}
          </ul>
        </div>
      </div>
      <div ref={mounted}></div>
    </>
  );
};

export default TweetArea;
