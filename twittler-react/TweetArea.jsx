import React, { memo } from "react";
import Tweet from "./Tweet";

const TweetArea = memo(({ data, filteredData, onClickUserName, text }) => {
  return (
    <div id="comments-wrapper">
      <div id="tweet-area">
        <ul id="tweet-list">
          {text === "back"
            ? filteredData.map((tweet, i) => {
                return <Tweet key={i} tweet={tweet} onClickUserName={onClickUserName} />;
              })
            : data.map((tweet, i) => {
                return <Tweet key={i} tweet={tweet} onClickUserName={onClickUserName} />;
              })}
        </ul>
      </div>
    </div>
  );
});

export default TweetArea;
