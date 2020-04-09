import React, { PureComponent } from "react";

class Try extends PureComponent {
  // constructor도 함수이기 때문에 함수 안에서 다른 동작을 할 수 있는 장점
  // 자유도, 정밀한 조작 가능
  constructor(props) {
    super(props);
    this.state = {
      result: this.props.result,
      try: this.props.try,
    };
  }
  render() {
    const { tryInfo } = this.props;
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    );
  }
}

export default Try;
