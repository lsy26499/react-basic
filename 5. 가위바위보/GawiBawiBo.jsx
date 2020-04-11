import React, { Component } from "react";

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

class GawiBawiBo extends Component {
  state = {
    result: "",
    imgCoord: "0",
    score: 0,
  };

  interval;

  changeHand = () => {
    const { imgCoord } = this.state; // 바깥에 선언하면 클로저 문제 발생
    // 비동기함수가 바깥의 변수 참조하면 클로저 문제 발생
    if (imgCoord === coords.바위) {
      this.setState({
        imgCoord: coords.가위,
      });
    } else if (imgCoord === coords.가위) {
      this.setState({
        imgCoord: coords.보,
      });
    } else if (imgCoord === coords.보) {
      this.setState({
        imgCoord: coords.바위,
      });
    }
  };

  componentDidMount() {
    this.interval = setInterval(this.changeHand, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onClickBtn = (e) => {
    const { imgCoord } = this.state;
    clearInterval(this.interval);
    const myScore = scores[e.target.textContent];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;

    if (diff === 0) {
      this.setState({
        result: "비겼습니다",
      });
    } else if ([1, -2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: "졌습니다",
          score: prevState.score - 1,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: "이겼습니다",
          score: prevState.score + 1,
        };
      });
    }

    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 100);
    }, 1500);
  };

  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div
          id="computer"
          style={{
            background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
          }}
        />
        <div>
          <button id="bawi" className="btn" onClick={this.onClickBtn}>
            바위
          </button>
          <button id="gawi" className="btn" onClick={this.onClickBtn}>
            가위
          </button>
          <button id="bo" className="btn" onClick={this.onClickBtn}>
            보
          </button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  }
}

export default GawiBawiBo;

// 컴포넌트 라이프사이클
// 렌더링되고 컴포넌트가 dom에 붙는 순간 특정한 동작을 할 수 있음
// componentDidMount - componentWillUnMount 쌍

// componentDidMount(): 렌더링이 처음 실행되고 성공적이었다면 실행
// 리렌더링 일어날 때는 componentDidMount 실행되지 X
// 안쪽에서 setState 실행해줄 수 있음
// 비동기 요청을 많이 함 (setInterval 같이)

// componentDidUpdate(): 리렌더링 된 후 실행

// componentWillUnmount(): 부모에 의해 컴포넌트가 제거되기 직전에 실행
// componentDidMount에서 했던 작업들을 제거
// 비동기 요청 정리를 많이 함 (clearInterval 같이)

// Class의 경우:
// constructor -> render -> ref -> componentDidMount
// -> setState / props 바뀔 때 -> shouldComponentUpdate(true) -> render -> componentDidUpdate
// -> 부모에 의해 없어질 때 -> componentWillUnmount -> 소멸
