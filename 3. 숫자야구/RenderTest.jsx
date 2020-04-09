import React, { PureComponent } from "react";

class RenderTest extends PureComponent {
  state = {
    counter: 0,
    string: "hello",
    number: 1,
    boolean: true,
    object: {},
    //array: [],
    array: [{ inside: [3] }],
    // 배열 내부에 객체 넣고... 하는 구조 사용하는 것은 피하기: 실수 자주 할 수 있음
    // 간단한 것만 state로 두는 것이 좋음
  };

  // shouldComponentUpdate(nextProps, nextState, nextContent) {
  //   // 현재 counter와 바뀐 counter가 다르다면 렌더링하고 아니라면 렌더링X
  //   if (this.state.counter !== nextState.counter) {
  //     return true;
  //   }
  //   return false;
  // }

  onClickBtn = (e) => {
    const array = this.state.array;
    console.log(array === this.state.array);
    // true, PureComponent가 바뀐 것 알아차리지 못해 렌더링 다시 되지 않음

    const obj = this.state.array[0].inside;
    obj.push(4);
    this.setState({
      // array: array,
      // array: [...this.state.array, 1],
      // 그렇기 때문에 array의 경우 아래의 코드처럼 사용해야 한다
      array: [obj],
      object: { ...this.state.object },
    });
  };

  render() {
    console.log("렌더링", this.state);
    return (
      <>
        <div>
          <button onClick={this.onClickBtn}>클릭</button>
        </div>
      </>
    );
  }
}

export default RenderTest;

// 버튼을 클릭할 때마다 렌더링 일어남
// state가 바뀌었는지 여부 상관 없아 setState만 호출되면 렌더링 일어남

// shouldComponentUpdate 이용해 어떤 경우에 렌더링 다시 하는지 적어줘야 함
// PureComponent만 사용하지 않고 shouldComponentUpdate 이용해 Component를 커스터마이징할 수 있음

// 혹은 Component 대신 PureComponent 사용
// PureComponent는 shouldComponentUpdate 자동으로 구현되어 있는 것
// PureComponent에서는 state가 바뀌었는지 여부를 보고 렌더링할지를 판단

// component 잘게 쪼개면 PureComponent 적용하기 쉬워짐
// component, props 잘게 쪼개면 nested array, object 사용하지 않을 수 있음

// 단점: state에 객체나 배열같은 복잡한 구조, 참조관계가 있는 구조가 생기면
// state가 바뀌었는지 여부를 정확히 판단하지 못함

// Hooks에서는 React.memo (memoization)
// state, props가 바뀌었을 때만 렌더링

// 가장 마지막 자식들에 PureComponent, React.memo 적용해 주는 것이 좋음
// 자식들이 모두 PureComponent, React.memo 적용되어 있다면 부모에도 적용할 수 있음
