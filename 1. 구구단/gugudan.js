const gugudan = document.querySelector("div");
const form = document.querySelector("form");

let firstNum = 0;
let lastNum = 0;
let correctNum = 0;

const paintGugudan = () => {
  firstNum = Math.ceil(Math.random() * 9);
  lastNum = Math.ceil(Math.random() * 9);
  correctNum = firstNum * lastNum;
  gugudan.textContent = `${firstNum} 곱하기 ${lastNum}는?`;
};

const paintResult = isCorrect => {
  const trueText = "딩동댕";
  const falseText = "땡";
  const result = document.createElement("div");
  result.classList.add("result");
  result.textContent = isCorrect ? trueText : falseText;
  if (isCorrect) paintGugudan();
  document.body.appendChild(result);
};

const handleSubmit = e => {
  e.preventDefault();
  if (document.querySelector(".result")) {
    document.body.removeChild(document.querySelector(".result"));
  }
  const answer = Number(form.querySelector("input").value);
  let isCorrect = answer === correctNum;
  paintResult(isCorrect);
  form.querySelector("input").value = "";
};

form.addEventListener("submit", handleSubmit);
paintGugudan();

// state: 문제 표시되는 부분, input, 결과창
