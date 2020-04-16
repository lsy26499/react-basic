import React, { useContext, memo } from "react";
import Td from "./Td";
import { TableContext } from "./Minesweeper";

const Tr = memo(({ rowIndex }) => {
  const { tableData } = useContext(TableContext);
  return (
    <tr>
      {tableData[0] &&
        Array(tableData[0].length)
          .fill()
          .map((td, i) => <Td rowIndex={rowIndex} cellIndex={i} key={i} />)}
    </tr>
  );
});

export default Tr;
