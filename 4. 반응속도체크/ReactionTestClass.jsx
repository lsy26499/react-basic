import React, { Component } from "react";
import ResultClass from "./ResultClass";

class ReactionTestClass extends Component {
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

  render() {
    const { state, message, result } = this.state;
    return (
      <>
        <div id="screen" className={state} onClick={this.onClickScreen}>
          {message}
        </div>
        <ResultClass resultInfo={result} reset={this.onReset} />
      </>
    );
  }
}

export default ReactionTestClass;
