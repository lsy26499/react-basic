import React, { memo } from "react";

// state 사용하지 않을 때는 함수 컴포넌트로 만들 수 있음
// Hooks 아님
const Ball = memo(({ number }) => {
  let background;
  if (number <= 10) {
    background = "red";
  } else if (number <= 20) {
    background = "orange";
  } else if (number <= 30) {
    background = "yellow";
  } else if (number <= 40) {
    background = "blue";
  } else {
    background = "green";
  }
  return (
    <div className="ball" style={{ background }}>
      {number}
    </div>
  );
});

// class Ball extends PureComponent {
//   render() {
//     const { number } = this.props;
//     let background;
//     if (number <= 10) {
//       background = "red";
//     } else if (number <= 20) {
//       background = "orange";
//     } else if (number <= 30) {
//       background = "yellow";
//     } else if (number <= 40) {
//       background = "blue";
//     } else {
//       background = "green";
//     }
//     return (
//       <div className="ball" style={{ background }}>
//         {number}
//       </div>
//     );
//   }
// }

export default Ball;
