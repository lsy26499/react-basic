import React, { memo, useState } from "react";

// 첫번째 인자로 props가 들어간다
const Try = memo(({ tryInfo }) => {
  // props는 자식 입장에서는 읽기 전용, 부모가 바꿔줘야 바뀐다
  // props를 바꿔야 할 경우는 props를 state에 넣어준 뒤 그 state를 바꾼다
  // 일반적인 상황에서는 자식이 props를 바꿔버리면 부모에게 영향이 가 버림
  // 하지만 props를 state에 넣어서 바꿀 경우에는 부모에게 영향이 가지 않음
  const [result, setResult] = useState(tryInfo.result);

  const onclickResult = () => {
    setResult("1");
  };

  console.log("렌더링");
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div onClick={onclickResult}>{result}</div>
    </li>
  );
});

export default Try;
