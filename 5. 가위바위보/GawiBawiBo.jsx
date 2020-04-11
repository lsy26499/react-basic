import React, { useState, useRef, useEffect } from "react";

const coords = {
  바위: "0",
  가위: "-142px",
  보: "-284px",
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(coords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
};

const GawiBawiBo = () => {
  const [result, setResult] = useState("");
  const [imgCoord, setImgCoord] = useState(coords.바위);
  const [score, setScore] = useState(0);
  const interval = useRef();

  // class의 라이프사이클과 비슷한 역할
  // 첫번째 인수는 함수, 두번째 인수는 배열
  // 배열에는 바꾸고 싶은 state가 들어감
  // 빈 배열을 넘긴다면 처음 한번만 실행되고 다시 실행되지 X
  // state마다 다른 효과 적용하고 싶다면 useEffect 여러번 사용할 수 있음
  useEffect(() => {
    // componentDidMount, componentDidUpdate 역할 (1:1 대응은 X)
    console.log("다시 실행"); // 함수형 컴포넌트는 렌더링 될때마다 다시실행
    interval.current = setInterval(changeHand, 100);
    return () => {
      //componentWillUnmount 역할
      console.log("다시 실행 종료");
      clearInterval(interval.current);
    };
  }, [imgCoord]);
  // imgCoord 바뀔때마다 매번 리렌더링되며 setInterval - clearInterval 반복되며 setInterval 같은 효과를 냄

  // useLayoutEffect: useEffect가 화면 렌더링 된 후에 실행되는 것과는 다르게 화면이 바뀌기 전에 감지, 특수한 상황에서만 사용, 사용법은 같음

  const changeHand = () => {
    if (imgCoord === coords.바위) {
      setImgCoord(coords.가위);
    } else if (imgCoord === coords.가위) {
      setImgCoord(coords.보);
    } else if (imgCoord === coords.보) {
      setImgCoord(coords.바위);
    }
  };

  const onClickBtn = (choice) => (e) => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;

    if (diff === 0) {
      setResult("비겼습니다");
    } else if ([1, -2].includes(diff)) {
      setResult("졌습니다");
      setScore((prevScore) => prevScore - 1);
    } else {
      setResult("이겼습니다");
      setScore((prevScore) => prevScore + 1);
    }

    setTimeout(() => {
      interval.current = setInterval(changeHand, 100);
    }, 1500);
  };

  return (
    <>
      <div
        id="computer"
        style={{
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
        }}
      />
      <div>
        <button id="bawi" className="btn" onClick={onClickBtn("바위")}>
          바위
        </button>
        <button id="gawi" className="btn" onClick={onClickBtn("가위")}>
          가위
        </button>
        <button id="bo" className="btn" onClick={onClickBtn("보")}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
};

export default GawiBawiBo;
