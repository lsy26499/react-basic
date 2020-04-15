import React, { useContext, useCallback } from "react";
import {
  TableContext,
  CODE,
  OPEN_CELL,
  CLICK_MINE,
  QUSETION_CELL,
  FLAG_CELL,
  NORMALIZE_CELL,
} from "./Minesweeper";

const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: "#444",
      };
    case CODE.CLICKED_MINE:
    case CODE.OPENED:
      return {
        background: "white",
      };
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return {
        background: "red",
      };
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return {
        background: "yellow",
      };
    default:
      return {
        background: "white",
      };
  }
};

const getTdText = (code) => {
  switch (code) {
    case CODE.NORMAL:
      return "";
    case CODE.MINE:
      return "X";
    case CODE.CLICKED_MINE:
      return "펑";
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return "!";
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return "?";
    default:
      return;
  }
};

const Td = ({ rowIndex, cellIndex }) => {
  const { tableData, dispatch, halted } = useContext(TableContext);

  // minesweeper 컴포넌트로 row, cell 값 전달되고 open_cell action을 받아 실행
  // 칸의 코드값에 따른 상태별로 취해줄 action을 다르게 함
  const onClickTd = useCallback(
    () => {
      // 게임이 멈췄으면 아무 일도 하지 않도록
      if (halted) {
        return;
      }

      switch (tableData[rowIndex][cellIndex]) {
        case CODE.OPENED:
        case CODE.FLAG_MINE:
        case CODE.FLAG:
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
          return;
        case CODE.NORMAL:
          dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
          return;
        case CODE.MINE:
          dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
          return;
        default:
          return;
      }
    },
    [tableData[rowIndex][cellIndex]],
    halted
  );

  const onRightClickTd = useCallback(
    (e) => {
      e.preventDefault();
      if (halted) {
        return;
      }

      switch (tableData[rowIndex][cellIndex]) {
        case CODE.NORMAL:
        case CODE.MINE:
          dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
          return;
        case CODE.FLAG_MINE:
        case CODE.FLAG:
          dispatch({ type: QUSETION_CELL, row: rowIndex, cell: cellIndex });
          return;
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
          dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
          return;
        default:
          return;
      }
    },
    [tableData[rowIndex][cellIndex]],
    halted
  );

  // 일반 셀을 우클릭 두번 했을 때 QUESTION으로 바뀌지 않는 문제
  // halted가 각각의 셀로 적용돼서 전체로 적용X -> 게임 끝나도 다른 셀들은 클릭됨
  // 오타인것같은데 못찾겠음 복붙해봐도 똑같음..

  return (
    <td
      style={getTdStyle(tableData[rowIndex][cellIndex])}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    >
      {getTdText(tableData[rowIndex][cellIndex])}
    </td>
  );
};

export default Td;
