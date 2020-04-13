import React, { useCallback, useRef, useEffect, memo } from "react";
import { CLICK_CELL } from "./TicTacToe";

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
  // 리렌더링 되는 이유 파악하기
  const ref = useRef([]);
  useEffect(() => {
    console.log(
      rowIndex === ref.current[0],
      cellIndex === ref.current[1],
      cellData === ref.current[2],
      dispatch === ref.current[3]
    ); // 바뀌는 게 있다면 false 값: 여기서는 cellData 때문에 리렌더링
    console.log(ref.current); // 이 컴포넌트에서 원인을 찾지 못했다면 부모를 살펴보기
    ref.current = [rowIndex, cellIndex, cellData, dispatch];
  }, [rowIndex, cellIndex, cellData, dispatch]);

  const onClickTd = useCallback(() => {
    if (cellData) {
      return;
    }

    dispatch(
      {
        type: CLICK_CELL,
        row: rowIndex,
        cell: cellIndex,
      },
      [cellData]
    );
  });

  return <td onClick={onClickTd}>{cellData}</td>;
});

export default Td;

// td 리렌더링 되면 tr이 리렌더링되고 table이 리렌더링되는 구조
// 자식이 리렌더링되면 부모로 퍼져나감
