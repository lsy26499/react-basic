import React, { useContext } from "react";
import Tr from "./Tr";
import { TableContext } from "./Minesweeper";

const Table = () => {
  const { tableData } = useContext(TableContext);
  return (
    <table>
      {Array(tableData.length)
        .fill()
        .map((tr, i) => (
          <Tr rowIndex={i} key={i} />
        ))}
    </table>
  );
};

export default Table;
