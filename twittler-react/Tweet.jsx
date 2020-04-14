import React, { memo } from "react";

const Tweet = memo(({ tweet, onClickUserName }) => {
  return (
    <li className="tweet">
      <div className="tweet-info">
        <span className="user" onClick={onClickUserName}>
          {tweet.user}
        </span>
        <span className="timestamp">{tweet.created_at}</span>
      </div>
      <div className="tweet-comment">{tweet.message}</div>
    </li>
  );
});

export default Tweet;
