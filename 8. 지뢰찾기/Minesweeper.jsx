import React, { useReducer, createContext, useMemo } from "react";
import Form from "./Form";
import Table from "./Table";

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
  timer: 0,
  result: "",
  halted: true,
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

// case 문 안에서 const 때문에 난 에러
// case 문은 별도의 렉시컬 스코프가 없기 때문에 별도의 스코프가 필요한 case 문을 {}로 감싸 줘야 한다
const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME: // 지뢰심기
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false,
      };
    case OPEN_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.OPENED; // 셀 여는 조작 (td에서 dispatch)
      return {
        ...state,
        tableData,
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
        tableData[action.row][action.cell] = CODE.QUSETION;
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
    default:
      return state;
  }
};

const Minesweeper = () => {
  const [state, dispatch] = useReducer(reducer, initalState);
  const { tableData, halted, timer, result } = state;
  const value = useMemo(() => ({ tableData, halted, dispatch }), [tableData, halted]);
  // dispatch는 항상 같게 유지됨

  return (
    <TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table />
      <div>{result}</div>
    </TableContext.Provider>
  );
};

export default Minesweeper;

// contextAPI 설정 하면 하위에 있는 어떤 컴포넌트에서도 값을 바로 받을 수 있음
// 1. createContext() 실행해 컨텍스트 생성: 안쪽의 기본값?
// 2. 접근하고 싶은 데이터의 컴포넌트를 contextAPI의 provider로 묶어주기
// 3. 묶어준 provider 안에 value를 넣어 주면 그 넣어준 value 값들을 자식 컴포넌트들에서 접근 가능
// 4. 자식 컴포넌트에서 useContext 안쪽에 부모 컨텍스트에서 만들어준 컨텍스트 넣어주기(1에서 만든 것)

// contextAPI는 성능 최적화가 어렵다?
//   부모 컴포넌트가 리렌더링될때마다 provider 안쪽에 넣어 준 value값들도 새로 생김 -> 자식들도 매번 리렌더링
//   해결하기 위해 useMemo 이용해 캐싱해줘야 함
