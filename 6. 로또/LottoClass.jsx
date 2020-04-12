import React, { Component } from "react";
import Ball from "./Ball";

// 계산량이 많은 함수이기 때문에 반복실행되는 것에 주의
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

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonus: null,
    redo: false,
  };

  timeouts = [];

  runTimeouts = () => {
    console.log("runTimeouts");
    const { winNumbers } = this.state;
    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]],
          };
        });
      }, (i + 1) * 1000);
    }
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7000);
  };

  componentDidMount() {
    console.log("didMount");
    this.runTimeouts();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("didUpdate");
    if (this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
    if (prevState.winNumbers !== this.state.winNumbers) {
      console.log("숫자추첨");
    }
  }

  componentWillUnmount() {
    this.timeouts.forEach((timeout) => {
      clearTimeout(timeout);
    });
  }

  onClickRedo = () => {
    console.log("onClickRedo");
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  };

  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id="result">
          {winBalls.map((v) => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
      </>
    );
  }
}

export default Lotto;
