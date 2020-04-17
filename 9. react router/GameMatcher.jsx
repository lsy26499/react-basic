import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NumberBaseball from "../3. 숫자야구/NumberBaseballClass";
import GawiBawiBo from "../5. 가위바위보/GawiBawiBoClass";
import Lotto from "../6. 로또/LottoClass";

export default class GameMatcher extends Component {
  render() {
    // 쿼리스트링 해석해서 데이터 보기
    let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1));
    console.log(urlSearchParams.get("hello")); // tomato

    // 동적 라우팅에서 설정해준 정보를 이용해 분기처리
    if (this.props.match.params.name === "number-baselball") {
      return <NumberBaseball />;
    } else if (this.props.match.params.name === "gawibawibo") {
      return <GawiBawiBo />;
    } else if (this.props.match.params.name === "lotto") {
      return <Lotto />;
    }
    return <div>일치하는 게임이 없습니다</div>;
  }
}

// props 안에 history, location, match 들어있음
// 위의 요소들은 Games의 Route 컴포넌트가 넣어줌
// 없을 경우 withRouter 이용
// history: 페이지 방문 기록, 뒤로가기, 앞으로 가기 등
// loation: 지금의 주소 정보
// match: 동적 라우팅에서 전달한 값들
// 실제 route에 등록했던 주소, params에 현재 주소값이 들어 있다 (이걸로 분기처리)

// history.pushState() API: 브라우저 주소 바꿀 수 있음
// this.props.history와는 다름, 브라우저의 history
// react router의 history도 브라우저의 history에 의존

// 쿼리 스트링: ?key1=value1&key2=value2&key3=value3 형태
// 주소에 데이터를 전달, 서버도 인식 가능
// this.props.location.search에 있음
