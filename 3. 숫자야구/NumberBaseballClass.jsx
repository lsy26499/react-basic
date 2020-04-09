import React, { Component, createRef } from "react";
import Try from "./TryClass";

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

class NumberBaseball extends Component {
  state = {
    result: "",
    value: "",
    answer: getNumbers(),
    tries: [], //push 쓰면 안돼
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.value === this.state.answer.join("")) {
      // 이전값을 활용하므로 함수형 setState로 사용
      // 미세한 작업을 더 할 수 있다는 장점 있음
      // 함수 안에 다른 함수 넣는 경우: 1급 객체, 1급 함수, high order function
      this.setState((prevState) => {
        return {
          result: "홈런!",
          tries: [...prevState.tries, { try: this.state.value, result: "홈런" }],
          //옛날거 복사해넣고 새거 다음에 붙여주는 식으로 배열에 요소추가
        };
      });
      alert("게임 다시 시작합니다");
      this.setState({
        value: "",
        answer: getNumbers(),
        tries: [],
      });
      // React.createRef 이용
      this.inputRef.current.focus();
    } else {
      const answerArr = this.state.value.split("").map((elem) => Number(elem));
      let strike = 0;
      let ball = 0;
      if (this.state.tries.length >= 9) {
        this.setState({
          result: `실패! 정답은 ${this.state.answer.join("")}`,
        });
        alert("게임 다시 시작합니다");
        this.setState({
          value: "",
          answer: getNumbers(),
          tries: [],
        });
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArr[i] === this.state.answer[i]) {
            strike += 1;
          } else if (this.state.answer.includes(answerArr[i])) {
            ball += 1;
          }
        }
        this.setState((prevState) => {
          return {
            tries: [
              ...prevState.tries,
              { try: this.state.value, result: `${strike} 스트라이크 ${ball} 볼` },
            ],
            value: "",
          };
        });
        console.log(this.state.tries);
      }
    }
  };

  onChangeInput = (e) => {
    console.log(this.state.answer);
    this.setState({ value: e.target.value });
  };

  inputRef = createRef();
  // React.createRef를 사용하면 onInputRef 사용할 필요 X

  // onInputRef = (c) => {
  //   this.inputRef = c;
  // };
  // 예전 방식은 함수이기 때문에 함수 안쪽에 다른 동작 할 수 있다는 장점 있음

  render() {
    // render 안에서 this.setState 실행하면 무한반복
    // render가 this.setState 실행, this.setState가 또 render 실행...
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            ref={this.inputRef}
            maxLength={4}
            value={this.state.value}
            onChange={this.onChangeInput}
          />
          <button>입력!</button>
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {this.state.tries.map((obj, idx) => {
            return <Try key={`${idx + 1}차시도`} tryInfo={obj} index={idx} />;
          })}
        </ul>
      </>
    );
  }
}

export default NumberBaseball;
