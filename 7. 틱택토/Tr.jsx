import React, { memo, useMemo } from "react";
import Td from "./Td";

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
  return (
    <tr>
      {Array(rowData.length)
        .fill()
        .map((td, i) =>
          useMemo(
            // useMemo 이용해 컴포넌트 자체를 기억하도록
            () => (
              <Td
                key={i}
                rowIndex={rowIndex}
                cellIndex={i}
                cellData={rowData[i]}
                dispatch={dispatch}
              />
            ),
            [rowData[i]]
          )
        )}
    </tr>
  );
});

export default Tr;
