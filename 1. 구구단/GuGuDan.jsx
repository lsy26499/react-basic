const React = require("react");
const { useState, useRef } = React; // 구조분해 문법 사용

const GuGuDan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputRef = useRef(null); // dom에 접근

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (Number(value) === first * second) {
      setResult((prevResult) => {
        return `${value} 딩동댕`;
      });
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue("");
      inputRef.current.focus();
    } else {
      setResult("땡");
      setValue("");
      inputRef.current.focus();
    }
  };

  return (
    <>
      <div>
        {first} 곱하기 {second} 는?
      </div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputRef} type="number" onChange={onChangeInput} value={value} />
        <button type="submit">입력!</button>
      </form>
      <div id="result">{result}</div>
    </>
  );
};

module.exports = GuGuDan;
