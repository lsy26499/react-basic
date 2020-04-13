import React, { useState, useReducer, useCallback, useEffect, memo } from "react";
import Table from "./Table";

const initialState = {
  winner: "",
  turn: "O",
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  currentCell: [-1, -1],
};

export const SET_WINNER = "SET_WINNER";
export const CLICK_CELL = "CLICK_CELL";
export const SET_TURN = "SET_TURN";
export const RESET_GAME = "RESET_GAME";

const reducer = (state, action) => {
  // type 이 여러 개이기 때문에 switch 문으로 처리
  switch (action.type) {
    case SET_WINNER:
      // state를 직접 바꾸면 X, 새로운 객체 만들어 바뀐 값만 변경
      return {
        ...state,
        winner: action.winner,
      };

    case CLICK_CELL:
      // state의 불변성을 지키기 위해 spread 연산자로 얕은복사 해서 사용
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]]; // immer 라이브러리로 가독성 문제 해결
      tableData[action.row][action.cell] = state.turn;

      return {
        ...state,
        tableData,
        currentCell: [action.row, action.cell],
      };

    case SET_TURN:
      return {
        ...state,
        turn: state.turn === "O" ? "X" : "O",
      };

    case RESET_GAME:
      return {
        ...state,
        turn: "O",
        tableData: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        currentCell: [-1, -1],
      };
    default:
      return state;
  }
};

const TicTacToe = memo(() => {
  // 아래 state들을 TicTacToe -> Table -> Tr -> Td로 전달해야 함
  // 이를 해결하기 위해 contextAPI 이용하거나
  // state 자체의 갯수 줄이는 useReducer 사용

  // redux에서 따온 개념
  const [state, dispatch] = useReducer(reducer, initialState);
  const { winner, turn, tableData, currentCell } = state;

  // 비동기 처리에 useEffect 이용
  useEffect(() => {
    const [row, cell] = currentCell;
    if (row < 0) {
      return;
    }

    let win = false;

    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }

    if (win) {
      // 승리
      dispatch({
        type: SET_WINNER,
        winner: turn,
      });
      dispatch({
        type: RESET_GAME,
      });
    } else {
      // 무승부 검사
      let all = true; // 칸들이 하나라도 비어 있으면 false로
      tableData.forEach((row) => {
        row.forEach((cell) => {
          if (!cell) {
            all = false;
          }
        });
      });

      if (all) {
        // 무승부
        dispatch({
          type: RESET_GAME,
        });
      } else {
        // 다음 턴
        dispatch({
          type: SET_TURN,
        });
      }
    }
  }, [tableData]);

  return (
    <>
      <Table tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner} 님의 승리</div>}
    </>
  );
});

export default TicTacToe;

// useReducer: react에서 redux의 reducer를 들여온 것
// react에서 redux와 비슷한 효과를 낼 수 있음
// 소규모 앱에서는 useReducer와 contextAPI로 redux를 대체할 수 있음 (하지만 비동기 처리가 불편)

// const [state, dispatch] = useReducer(reducer, initialState) 의 형태
// 첫번째 인자로는 reducer 안에서 state 어떻게 바꿀 지 정하는 함수
// 두번째 인자로는 state 모음

// state를 변경하고자 dispatch 사용할 때는 dispatch 안에 action 개체 만들고
// dispatch로 action 실행
// action을 해석해서 state 바꿔주는 역할 -> reducer
// action을 dispatch 할 때마다 reducer 실행

// const onClickTable = useCallback(() => {
//     dispatch({
//       type: SET_WINNER,  -> action.type
//       winner: "O",  -> action.winner
//     });  -> action 객체
//   }, []);
