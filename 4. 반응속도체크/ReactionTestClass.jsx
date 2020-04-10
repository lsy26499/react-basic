import React, { Component } from "react";

class ReactionTest extends Component {
  state = {
    state: "waiting",
    message: "클릭해서 시작하세요",
    result: [],
  };

  timeout;
  startTime;
  endTime;

  onClickScreen = (e) => {
    const { state, message, result } = this.state;
    if (state === "waiting") {
      this.setState({
        state: "ready",
        message: "초록색이 되면 클릭하세요",
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: "now",
          message: "지금 클릭",
        });
        this.startTime = new Date();
        // 시작시간 기록, state 바뀐 것이 아니기 때문에 렌더링 일어나지X
      }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤
    } else if (state === "ready") {
      // 성급하게 클릭
      this.setState({
        state: "waiting",
        message: "너무 성급하시군요! 초록색이 된 후에 클릭하세요",
      });
      clearTimeout(this.timeout);
    } else if (state === "now") {
      // 반응속도 체크
      this.endTime = new Date();
      this.setState((prevState) => {
        return {
          state: "waiting",
          message: "클릭해서 시작하세요",
          result: [...prevState.result, this.endTime - this.startTime],
        };
      });
    }
  };

  onReset = () => {
    const { result } = this.state;
    this.setState({
      result: [],
    });
  };

  renderAverage = () => {
    const { result } = this.state;
    return result.length === 0 ? null : (
      <>
        <div>
          평균 시간: {result.reduce((acc, cur) => acc + cur) / result.length}
          ms
        </div>
        <div>{result.length}회 클릭하셨습니다</div>
        <button onClick={this.onReset}>리셋</button>
      </>
    );
  };

  render() {
    const { state, message } = this.state;
    return (
      <>
        <div id="screen" className={state} onClick={this.onClickScreen}>
          {message}
        </div>
        {this.renderAverage()}
      </>
    );
  }
}

export default ReactionTest;

// react의 조건문은 삼항연산자 / && || 같은 연산자 이용
// react의 반복문은 map 이용
// 조건문/반복문이 너무 길어질 경우 따로 함수로 빼서 사용
// 함수보다는 새 컴포넌트로 빼서 사용하는 것이 더 좋음

// Todo: 결과창 새 컴포넌트로 빼기 (result를 props로)
