import React, { useState, useRef, memo } from "react";
import Result from "./Result";

const ReactionTest = memo(() => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요");
  const [result, setResult] = useState([]);
  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = (e) => {
    if (state === "waiting") {
      setState("ready");
      setMessage("초록색이 되면 클릭하세요");
      timeout.current = setTimeout(() => {
        setState("now");
        setMessage("지금 클릭");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤
    } else if (state === "ready") {
      // 성급하게 클릭
      setState("waiting");
      setMessage("너무 성급하시군요! 초록색이 된 후에 클릭하세요");
      clearTimeout(timeout.current);
    } else if (state === "now") {
      // 반응속도 체크
      endTime.current = new Date();
      setState("waiting");
      setMessage("클릭해서 시작하세요");
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  };

  const onReset = () => {
    setResult([]);
  };

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      <Result resultInfo={result} reset={onReset} />
    </>
  );
});

export default ReactionTest;

// react의 조건문은 삼항연산자 / && || 같은 연산자 이용
// react의 반복문은 map 이용
// 조건문/반복문이 너무 길어질 경우 따로 함수로 빼서 사용
// 함수보다는 새 컴포넌트로 빼서 사용하는 것이 더 좋음

// Todo: 결과창 새 컴포넌트로 빼기 (result를 props로)

// Hooks에서는 위의 코드의 timeout, starttime과 같이 변수 만들어 저장할 때 ref 사용
// ref를 dom에 접근할 때 뿐만아니라 this의 속성들을 표현할 때도 사용(Hooks에서)
// useState: 리턴 부분이 재실행 -> 다시 렌더링
// useRef: 리턴 부분 재실행되지 않음 -> 불필요한 렌더링이 일어나지 않음
// 그래서 값이 바뀌지만 화면에는 영향 미치고싶지 않을 때 useRef 사용

// return 안에 for, if 사용할 때:
// {} 안에는 javascript 사용할 수 있고 함수 안에는 if, for 사용할 수 있다는 점을 이용
// return 안쪽 {} 안에 즉시실행함수 만들어 if, for 사용
