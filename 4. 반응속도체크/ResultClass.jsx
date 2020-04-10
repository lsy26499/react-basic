import React, { PureComponent } from "react";

class ResultClass extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      result: this.props.result,
    };
  }

  render() {
    const { resultInfo, reset } = this.props;
    return (
      <>
        {resultInfo.length === 0 ? null : (
          <>
            <div>
              평균 시간: {resultInfo.reduce((acc, cur) => acc + cur) / resultInfo.length}
              ms
            </div>
            <div>{resultInfo.length}회 클릭하셨습니다</div>
            <button onClick={reset}>리셋</button>
          </>
        )}
      </>
    );
  }
}

export default ResultClass;
