import React from "react";
import { BrowserRouter, HashRouter, Route, Link, Switch } from "react-router-dom";
import NumberBaseball from "../3. 숫자야구/NumberBaseballClass";
import GawiBawiBo from "../5. 가위바위보/GawiBawiBoClass";
import Lotto from "../6. 로또/LottoClass";
import GameMatcher from "./GameMatcher";

const Games = () => {
  return (
    // <HashRouter>
    //   <div>
    //     <Link to="/number-baselball">숫자야구</Link>
    //     &nbsp;
    //     <Link to="/gawibawibo">가위바위보</Link>
    //     &nbsp;
    //     <Link to="/lotto">로또추첨기</Link>
    //   </div>
    //   <div>
    //     <Route path="/number-baseball" component={NumberBaseball}></Route>
    //     <Route path="/gawibawibo" component={GawiBawiBo}></Route>
    //     <Route path="/lotto" component={Lotto}></Route>
    //   </div>
    // </HashRouter>

    <BrowserRouter>
      <div>
        <Link to="/game/number-baselball?query=10&hello=tomato">숫자야구</Link>
        &nbsp;
        <Link to="/game/gawibawibo">가위바위보</Link>
        &nbsp;
        <Link to="/game/lotto">로또추첨기</Link>
        &nbsp;
        <Link to="/game/index">게임매쳐</Link>
      </div>
      <div>
        {/* <Route path="/number-baseball" component={NumberBaseball}></Route>
        <Route path="/gawibawibo" component={GawiBawiBo}></Route>
        <Route path="/lotto" component={Lotto}></Route> */}

        {/* games에서 gamematcher로 props 넘기기 */}
        {/*<Route path="/game/:name" component={() => <GameMatcher props={...props} />}></Route>
        <Route path="/game/:name" render={(props) => <GameMatcher props={...props} />}></Route>*/}

        <Switch>
          <Route path="/game/:name" component={GameMatcher}></Route>
          <Route path="/game/number-baseball" component={GameMatcher}></Route>
          {/* number-baseball에서 둘다 나옴, Switch 사용 */}
          {/* : 뒷부분은 params라고 불리고, 동적으로 바뀜 */}
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Games;

// 리액트 라우터
// 라우터를 사용하기 위해서는 컴포넌트의 최상단을 router로 감싸야 함
// 가상의 페이지 주소를 만들어 각 컴포넌트를 연결
// a 태그 사용 X, 리액트 라우터 기능인 Link 사용
// <Link to="/aaaa"></Link> 형태로 사용

// BrowserRouter: 주소가 깔끔, 새로고침하면 서버에 요청 가서 에러
// 검색엔진 등에서 서버에서 데이터 가져올 수 있음 (서버쪽 세팅 해줘야 함)
// 실무에는 더 적합

// HashRouter: 주소 중간에 # 보임, 새로고침해도 화면 보임
// hash 뒤의 부분은 서버가 인식하지 못함 (브라우저, 리액트 라우터만 인식)
// 검색 엔진 등에서 불이익을 받음
// 관리자 페이지 등에 주로 사용

// 동적 라우트 매칭: 라우트 수가 많아질 때 효율적으로 라우트 관리 위함

// Switch: 첫번째로 일치하는 것만 렌더링
// 동시에 route 여러 개 렌더링되는 것 해결 -> 상위, 하위주소가 일치한다고 여길 때는 해결 X

// exact: 해당 주소와 일치하는 것만 렌더링
// 상위 주소의 경우도 일치한다고 여겨 같이 렌더링될 때 사용

// TODO: react router hooks 찾아보기
