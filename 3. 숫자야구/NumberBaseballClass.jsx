import React, { Component } from "react";
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

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
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
