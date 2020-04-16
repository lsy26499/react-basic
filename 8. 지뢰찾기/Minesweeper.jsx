import React, { useReducer, createContext, useMemo, useEffect, memo } from "react";
import Table from "./Table";
import Form from "./Form";

// 칸의 상태에 따라 tableData에 저장
// 각 상태를 구분해주기 위해 숫자를 다르게 해서 저장
export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, // 0 이상이면 다 opened, 주변의 지뢰가 있는 갯수만큼 숫자를 더해줄 것
};

export const TableContext = createContext({
  // 초기값, 각 요소들 형태만 맞춰주기
  tableData: [],
  halted: true,
  dispatch: () => {},
});

const initalState = {
  tableData: [],
  data: {
    row: 0,
    cell: 0,
    mine: 0,
  },
  timer: 0,
  result: "",
  halted: true,
  openedCount: 0,
};

const plantMine = (row, cell, mine) => {
  // 0 ~ (row * cell) 크기만큼의 배열 생성, 무작위로 뽑은 지뢰 위치 담을 배열 생성
  const sample = Array(row * cell)
    .fill()
    .map((arr, i) => {
      return i;
    });
  const shuffle = [];

  // 지뢰 위치 뽑기
  while (sample.length > row * cell - mine) {
    const picked = sample.splice(Math.floor(Math.random() * sample.length), 1)[0];
    shuffle.push(picked);
  }

  // 이차원배열에 기본 닫힌 상태 코드 넣어주기
  const data = Array(row)
    .fill()
    .map((arr, i) => {
      return Array(cell).fill(CODE.NORMAL);
    });

  // 이차원배열에 지뢰 심기
  shuffle.forEach((num, i) => {
    const jul = Math.floor(num / cell);
    const can = num % cell;
    data[jul][can] = CODE.MINE;
  });

  return data;
};

export const START_GAME = "START_GAME";
export const OPEN_CELL = "OPEN_CELL";
export const CLICK_MINE = "CLICK_MINE";
export const FLAG_CELL = "FLAG_CELL";
export const QUSETION_CELL = "QUSETION_CELL";
export const NORMALIZE_CELL = "NORMALIZE_CELL";
export const INCREMENT_TIMER = "INCREMENT_TIMER";

// case 문 안에서 const 때문에 난 에러
// case 문은 별도의 렉시컬 스코프가 없기 때문에 별도의 스코프가 필요한 case 문을 {}로 감싸 줘야 한다
const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME: // 지뢰심기
      return {
        ...state,
        data: {
          row: action.row,
          cell: action.cell,
          mine: action.mine,
        },
        openedCount: 0,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false,
        timer: 0,
      };
    case OPEN_CELL: {
      const tableData = [...state.tableData];
      // 모든 칸들을 tableData로 만들어주기
      tableData.forEach((row, i) => {
        tableData[i] = [...row];
      });
      const checked = []; // 한번 검사한 칸은 다시 검사하지 않도록 검사된 칸들 저장
      let openedCount = 0; // 열린 칸 숫자 세기

      // 현재 칸 기준으로 주변 칸들 검사
      const checkAround = (row, cell) => {
        // 열렸거나 지뢰가 있는 칸들은 열어주지 X
        if (
          [CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(
            tableData[row][cell]
          )
        ) {
          return;
        }
        // 상하좌우 칸이 아닌 경우 필터링
        if (row < 0 || row > tableData.length || cell < 0 || cell > tableData[0].length) {
          return;
        }
        // 한번 검사되었던 칸인지
        if (checked.includes(row + ", " + cell)) {
          return;
        } else {
          checked.push(row + ", " + cell);
        }

        let around = [];
        // 윗줄검사
        if (tableData[row - 1]) {
          around = around.concat(
            tableData[row - 1][cell - 1],
            tableData[row - 1][cell],
            tableData[row - 1][cell + 1]
          );
        }
        // 양옆 검사
        around = around.concat(tableData[row][cell - 1], tableData[row][cell + 1]);
        // 아랫줄 검사
        if (tableData[row + 1]) {
          around = around.concat(
            tableData[row + 1][cell - 1],
            tableData[row + 1][cell],
            tableData[row + 1][cell + 1]
          );
        }
        // 주변 지뢰 포함한 코드값들만 걸러내 갯수 세기 -> 주변의 지뢰 갯수 파악
        const count = around.filter((data) =>
          [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(data)
        ).length;

        // 주변 지뢰 0일때 주변 칸들도 검사
        if (count === 0) {
          const near = [];
          // 위칸
          if (row - 1 > -1) {
            near.push([row - 1, cell - 1]);
            near.push([row - 1, cell]);
            near.push([row - 1, cell + 1]);
          }
          // 양옆칸
          near.push([row, cell - 1]);
          near.push([row, cell + 1]);
          // 아래칸
          if (row + 1 < tableData.length) {
            near.push([row + 1, cell - 1]);
            near.push([row + 1, cell]);
            near.push([row + 1, cell + 1]);
          }
          // 주변칸들을 클릭(undefiened가 아닌 칸들만)
          near.forEach((n) => {
            // 주변 칸이 닫혀있을 때만 실행
            if (tableData[n[0]][n[1]] !== CODE.OPENED) {
              checkAround(n[0], n[1]);
            }
          });
        }
        console.log(tableData[row][cell] === CODE.NORMAL);
        // 닫힌 칸을 열었을 때만 카운트 증가
        if (tableData[row][cell] === CODE.NORMAL) {
          openedCount += 1;
        }
        tableData[row][cell] = count;
      };

      checkAround(action.row, action.cell);

      let halted = false;
      let result = "";
      // 승리조건
      if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {
        halted = true;
        result = `${state.timer}초만에 승리하셨습니다`;
      }

      return {
        ...state,
        tableData,
        openedCount: state.openedCount + openedCount,
        halted,
        result,
      };
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        halted: true,
      };
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      };
    }
    case QUSETION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE;
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData,
      };
    }
    case INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1,
      };
    }
    default:
      return state;
  }
};

const Minesweeper = memo(() => {
  const [state, dispatch] = useReducer(reducer, initalState);
  const { tableData, halted, timer, result } = state;
  const value = useMemo(() => ({ tableData, halted, dispatch }), [tableData, halted]);
  // dispatch는 항상 같게 유지됨

  useEffect(() => {
    if (!halted) {
      let timer;
      timer = setInterval(() => {
        dispatch({ type: INCREMENT_TIMER });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [halted]);

  return (
    <TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table />
      <div>{result}</div>
    </TableContext.Provider>
  );
});

export default Minesweeper;

// contextAPI 설정 하면 하위에 있는 어떤 컴포넌트에서도 값을 바로 받을 수 있음
// 1. createContext() 실행해 컨텍스트 생성: 안쪽의 기본값?
// 2. 접근하고 싶은 데이터의 컴포넌트를 contextAPI의 provider로 묶어주기
// 3. 묶어준 provider 안에 value를 넣어 주면 그 넣어준 value 값들을 자식 컴포넌트들에서 접근 가능
// 4. 자식 컴포넌트에서 useContext 안쪽에 부모 컨텍스트에서 만들어준 컨텍스트 넣어주기(1에서 만든 것)

// contextAPI는 성능 최적화가 어렵다?
//   부모 컴포넌트가 리렌더링될때마다 provider 안쪽에 넣어 준 value값들도 새로 생김 -> 자식들도 매번 리렌더링
//   해결하기 위해 useMemo 이용해 캐싱해줘야 함
