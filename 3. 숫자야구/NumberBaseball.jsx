import React, { Component } from "react";
import Try from "./Try";

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
      this.setState({
        result: "홈런!",
        tries: [...this.state.tries, { try: this.state.value, result: "홈런" }],
        //옛날거 복사해넣고 새거 다음에 붙여주는 식으로 배열에 요소추가
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
        this.setState({
          tries: [
            ...this.state.tries,
            { try: this.state.value, result: `${strike} 스트라이크 ${ball} 볼` },
          ],
          value: "",
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

// export default hello = "a";
// default로 export한 것들은 import NumberBaseball 형태로 가져옴
// default로 export하지 않은 것들은 import { hello } 형태로 가져옴
// node 모듈 시스템에서 module.exports = { hello: 'a' } 와 exports.hello = 'a' 는 같음
// node에서는 common js만 적용되는 것 => babel이 바꿔준다
// webpack은 node가 돌리고 있기 때문에 const ~ require만 사용
// 클라이언트에서는 babel이 바꿔주기 때문에 import 사용가능

// 컴포넌트 -> 컴포넌트로 데이터 넘길 때 props 사용
// props 생김으로써 부모자식관계 생김
