const form = document.querySelector("#write-comment-wrapper");
const userNameInput = form.querySelector("#write-username");
const commentInput = form.querySelector("#write-comment");
const submitBtn = form.querySelector("#submit-button");
const tweetList = document.querySelector("#tweet-list");
const checkBtn = document.querySelector("#check-new-tweet-btn");

// DATA는 이미 작성된 트윗을 표시합니다.
// TODO: timestamp 작성시간 표시

//각각의 트윗 HTML요소 만들기
function tweetMaker(data) {
  //각각의 li 생성
  let li = document.createElement("li");
  li.className = "tweet";
  //userName, timestamp 감싸는 div 생성
  let infoDiv = document.createElement("div");
  infoDiv.className = "tweet-info";
  //userName 표시
  let userSpan = document.createElement("span");
  userSpan.className = "user";
  userSpan.textContent = data.user;
  userSpan.addEventListener("click", handleNameClick);
  //timestamp 표시
  let timeSpan = document.createElement("span");
  timeSpan.className = "timestamp";
  timeSpan.textContent = moment(`${data.created_at}`, "YYYY-MM-DD hh:mm:ss").fromNow();
  //comment 표시
  let commentDiv = document.createElement("div");
  commentDiv.className = "tweet-comment";
  commentDiv.textContent = data.message;

  //조립
  infoDiv.appendChild(userSpan);
  infoDiv.appendChild(timeSpan);
  li.appendChild(infoDiv);
  li.appendChild(commentDiv);
  tweetList.prepend(li);
}

//DATA에 저장된 값들 트윗 표시
function paintTweets(dataArray) {
  //ul 초기화
  tweetList.innerHTML = "";
  //매개변수로 넘겨진 배열의 각 객체들을 tweetMaker 함수에 매개변수로 넘기기
  dataArray.forEach((elem) => {
    tweetMaker(elem);
  });
}

//작성된 트윗을 DATA에 저장
function tweetToData() {
  let tweet = {};
  let date = new Date();
  //유저이름과 코멘트 모두 작성되었을 경우만 DATA에 트윗 저장
  if (userNameInput.value !== "" && commentInput.value !== "") {
    tweet.user = userNameInput.value;
    tweet.message = commentInput.value;
    tweet.created_at = date.format();
    DATA.push(tweet);
    saveTweets();
    //입력창 초기화
    userNameInput.value = "";
    commentInput.value = "";
  } else {
    console.log("트윗을 입력해주세요");
  }
}

//이름으로 필터링하기
function handleNameClick(e) {
  const clickedName = e.target.textContent;
  let filteredData = DATA.filter((elem) => elem.user === clickedName);
  paintTweets(filteredData);
  checkBtn.textContent = "back";
  //버튼이 뒤로가기일 때만 실행
  if (checkBtn.textContent === "back") {
    checkBtn.addEventListener("click", handleBackButton);
  }
}

//뒤로가기 버튼을 랜덤트윗 버튼으로 바꾸고 트윗 화면 원상복구
function handleBackButton() {
  checkBtn.textContent = "check new tweet!";
  paintTweets(DATA);
}

//트윗하기 버튼 눌렀을 때 실행
function handleSubmitButton(e) {
  e.preventDefault();
  tweetToData();
  paintTweets(DATA);
}

// generateNewTweet을 호출할 때마다 새로운 트윗을 생성합니다.
function handleCheckButton() {
  //버튼이 랜덤트윗 표시일 때만 실행
  if (checkBtn.textContent === "check new tweet!") {
    DATA.push(generateNewTweet());
    saveTweets();
    paintTweets(DATA);
  }
}

// localStorage에서 데이터 가져오기
function loadData() {
  const localStorageData = localStorage.getItem(LS_DATA);
  const loadedData = JSON.parse(localStorageData);
  return loadedData;
}

function init() {
  if (loadData() === null) {
    saveTweets();
  } else {
    DATA = loadData();
  }
  paintTweets(DATA);
  submitBtn.addEventListener("click", handleSubmitButton);
  checkBtn.addEventListener("click", handleCheckButton);
}

init();
