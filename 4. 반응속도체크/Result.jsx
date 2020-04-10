import React, { memo } from "react";

const Result = memo(({ resultInfo, reset }) => {
  return (
    <>
      {resultInfo.length === 0 ? null : (
        <>
          <div>
            평균 시간: {resultInfo.reduce((acc, cur) => acc + cur) / resultInfo.length}
            ms
          </div>
          <div>{resultInfo.length}회 클릭하셨습니다</div>
          <button onClick={reset}>리셋</button>
        </>
      )}
    </>
  );
});

export default Result;
