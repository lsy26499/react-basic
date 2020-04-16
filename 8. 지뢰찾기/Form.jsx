import React, { useState, useCallback, useContext, memo } from "react";
import { TableContext, START_GAME } from "./Minesweeper";

const Form = memo(() => {
  const [row, setRow] = useState(10);
  const [cell, setCell] = useState(10);
  const [mine, setMine] = useState(20);
  const { dispatch } = useContext(TableContext);

  const onChangeRow = useCallback((e) => {
    setRow(Number(e.target.value));
  }, []);

  const onChangeCell = useCallback((e) => {
    setCell(Number(e.target.value));
  }, []);

  const onChangeMine = useCallback((e) => {
    setMine(Number(e.target.value));
  }, []);

  const onClickButton = useCallback(
    (e) => {
      dispatch({ type: START_GAME, row, cell, mine });
    },
    [row, cell, mine]
  );

  return (
    <div>
      <input type="number" placeholder="열" value={row} onChange={onChangeRow} />
      <input type="number" placeholder="행" value={cell} onChange={onChangeCell} />
      <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine} />
      <button onClick={onClickButton}>시작!</button>
    </div>
  );
});

export default Form;
