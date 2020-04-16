import React, { useContext, useCallback, memo, useMemo } from "react";
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
      return code || "";
  }
};

const Td = memo(({ rowIndex, cellIndex }) => {
  const { tableData, dispatch, halted } = useContext(TableContext);

  // minesweeper 컴포넌트로 row, cell 값 전달되고 open_cell action을 받아 실행
  // 칸의 코드값에 따른 상태별로 취해줄 action을 다르게 함
  const onClickTd = useCallback(() => {
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
  }, [tableData[rowIndex][cellIndex], halted]);

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
    [tableData[rowIndex][cellIndex]]
  );

  // td 리렌더링 이슈: useMemo로 캐싱
  //  return useMemo(() => (
  //    <td
  //      style={getTdStyle(tableData[rowIndex][cellIndex])}
  //      onClick={onClickTd}
  //      onContextMenu={onRightClickTd}
  //    >
  //      {getTdText(tableData[rowIndex][cellIndex])}
  //    </td>
  //  ));
  return (
    <RealTd
      onClickTd={onClickTd}
      onRightClickTd={onRightClickTd}
      data={tableData[rowIndex][cellIndex]}
    />
  );
});

// td 리렌더링 이슈: 컴포넌트 쪼개기
const RealTd = memo(({ onClickTd, onRightClickTd, data }) => {
  return () => (
    <td style={getTdStyle(data)} onClick={onClickTd} onContextMenu={onRightClickTd}>
      {getTdText(tableData[rowIndex][cellIndex])}
    </td>
  );
});

export default Td;
