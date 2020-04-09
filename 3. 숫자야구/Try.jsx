import React, { memo } from "react";

// 첫번째 인자로 props가 들어간다
const Try = memo(({ tryInfo }) => {
  console.log("렌더링");
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});

export default Try;
