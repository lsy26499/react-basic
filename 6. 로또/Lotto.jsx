import React, { useState, useRef, useEffect, useMemo, useCallback, memo } from "react";
import Ball from "./Ball";

// 계산량이 많은 함수이기 때문에 반복실행되는 것에 주의
// Hooks에서는 Lotto 함수 전체가 재실행되기 때문에 매번 getWinNumbers도 다시 실행
// 해결 위해 리턴값들을 캐싱해둠: useMemo
const getWinNumbers = () => {
  console.log("번호추첨");
  const sample = Array(45)
    .fill()
    .map((num, i) => i + 1);
  const shuffle = [];
  while (sample.length > 0) {
    shuffle.push(sample.splice(Math.floor(Math.random() * sample.length), 1)[0]);
  }
  const winNumbers = shuffle.slice(0, 6).sort((a, b) => a - b);
  const bonusNumber = shuffle[shuffle.length - 1];
  return [...winNumbers, bonusNumber];
};

const Lotto = memo(() => {
  const lottoNumbers = useMemo(() => getWinNumbers(), []); // 두번째 인자가 바뀌지 않는 한 재실행되지 X
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  // input(두번째 인자 자리)이 빈 배열이면 componentDidMount와 같음
  // 배열에 요소 있으면 componentDidMount, componentDidUpdate 둘다 수행
  // 배열 내부의 조건은 state가 아니어도 됨
  useEffect(() => {
    for (let i = 0; i < winNumbers.length - 1; i++) {
      // 아래의 코드에서는 timeouts.current가 바뀌지 X
      // current 배열의 요소로 넣어줬기 때문
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevWinBalls) => {
          return [...prevWinBalls, winNumbers[i]];
        });
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);

    // componentWillUnmount
    return () => {
      timeouts.current.forEach((timeout) => {
        clearTimeout(timeout);
      });
    };
  }, [timeouts.current]);
  // timeouts.current가 바뀌는 시점을 기준: onClickRedo 내부에서 감지

  // 함수 생성하는 것이 비용이 클 경우 사용
  // 함수 자체를 기억해 두고 Hooks에서 매번 리렌더링될 때 기억해 둔 함수 사용
  // useCallback 안에서 state 사용할 경우 input에 넣어줘야 함
  // 자식 컴포넌트에 props로 함수 넘길 때에는 useCallback 필수로 적용해야 함
  // 적용해주지 않았을 경우는 자식 컴포넌트에 매번 생성된 새로운 함수가 전달되기 때문
  // 자식 컴포넌트는 매번 받는 props가 바뀌었다고 감지해 매번 새로 렌더링해버림
  const onClickRedo = useCallback(() => {
    console.log(winNumbers); // 여러 번 호출되어도 state 값이 바뀌지 않음
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = []; // timeouts.current를 직접 바꿔줌
  }, [winNumbers]);

  return (
    <>
      <div>당첨 숫자</div>
      <div id="result">
        {winBalls.map((v) => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} onClick={onClickRedo} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
});

export default Lotto;

// useRef: 일반 값 기억
// useMemo: 복잡한 함수 리턴값 기억, 두번째 인자가 배열
// useCallback: 함수 자체를 기억, 두번째 인자가 배열

// useEffect, useMemo, useCallback의 두 번째 인자가 어떤 때에 다시 실행되어야 하는지 결정하므로 매우 중요

// Hooks에서는 순서가 매우 중요, 실행 순서도 작성된 순서대로
