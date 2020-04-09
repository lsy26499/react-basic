import React, { useState, useRef, memo } from "react";
import Try from "./Try";

// this 사용하지 않는 경우는 function을 class 밖으로 빼낼 수 있음
function getNumbers() {
  // 랜덤숫자 겹치지 않게 뽑는 함수
  const sample = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const picked = sample.splice(Math.floor(Math.random() * sample.length), 1)[0];
    array.push(picked);
  }
  return array;
}

const NumberBaseball = memo(() => {
  const [result, setResult] = useState("");
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);
  const inputEl = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (value === answer.join("")) {
      setResult("홈런");
      setTries((prevTries) => {
        return [...prevTries, { try: value, result: "홈런" }];
      });
      alert("게임 다시 시작합니다");
      setValue("");
      setAnswer(getNumbers());
      setTries([]);
      inputEl.current.focus();
    } else {
      const answerArr = value.split("").map((elem) => Number(elem));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        setResult(`실패! 정답은 ${answer.join("")}`);
        alert("게임 다시 시작합니다");
        setValue("");
        setAnswer(getNumbers());
        setTries([]);
        inputEl.current.focus();
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArr[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArr[i])) {
            ball += 1;
          }
        }
        setTries((prevTries) => {
          return [...prevTries, { try: value, result: `${strike} 스트라이크 ${ball} 볼` }];
        });
        setValue("");
        inputEl.current.focus();
      }
    }
  };

  const onChangeInput = (e) => {
    console.log(answer);
    setValue(e.target.value);
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input ref={inputEl} maxLength={4} value={value} onChange={onChangeInput} />
        <button>입력!</button>
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((obj, idx) => {
          return <Try key={`${idx + 1}차시도`} tryInfo={obj} index={idx} />;
        })}
      </ul>
    </>
  );
});

export default NumberBaseball;

// export default hello = "a";
// default로 export한 것들은 import NumberBaseball 형태로 가져옴
// default로 export하지 않은 것들은 import { hello } 형태로 가져옴
// node 모듈 시스템에서 module.exports = { hello: 'a' } 와 exports.hello = 'a' 는 같음
// node에서는 common js만 적용되는 것 => babel이 바꿔준다
// webpack은 node가 돌리고 있기 때문에 const ~ require만 사용
// 클라이언트에서는 babel이 바꿔주기 때문에 import 사용가능

// 컴포넌트 -> 컴포넌트로 데이터 넘길 때 props 사용
// props 생김으로써 부모자식관계 생김
