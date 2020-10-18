//defaul page load displays Title of coding quiz and a start button

// the first question diaplays and
const startButton = document.getElementById("start-btn");
const questionContainerEl = document.getElementById("question-container");
const questionEl = document.getElementById("question");
const answerButtonsEL = document.getElementById("answer-buttons");
const rightWrong = document.getElementById("alertUser");

let listQuestions, currentQuestionIndex, button;
let score = 0;
//1. When user presses start quiz....
startButton.addEventListener("click", startQuiz);

// the first question displays
function startQuiz() {
  startTimer();
  startButton.classList.add("hide");
  listQuestions = questions.sort();
  currentQuestionIndex = 0;
  questionContainerEl.classList.remove("hide");
  nextQuestion();
}
// a timer starts for 60 seconds
function startTimer() {
  console.log("timer started");
  let sec = 5;
  const timer = setInterval(function () {
    if (sec === 0) {
      clearInterval(timer);
    }
    document.getElementById("time-display").innerHTML = "00:" + sec;
    sec--;
  }, 1000);
}

function nextQuestion() {
  resetQuestions();
  showQuestion(listQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionEl.innerText = question.question;
  question.answers.forEach((answer) => {
    button = document.createElement("button");
    button.innerText = answer.text;
    button.value = answer.correct;
    button.classList.add("btn");
    button.addEventListener("click", selectAnswer);
    answerButtonsEL.appendChild(button);
  });
}

function resetQuestions() {
  while (answerButtonsEL.firstChild) {
    answerButtonsEL.removeChild(answerButtonsEL.firstChild);
  }
}

//2. When the user clicks (selects) an answer
// 10 seconds removed for wrong answer

function selectAnswer(e) {
  //moves to next question automatically
  if (currentQuestionIndex <= 3) {
    currentQuestionIndex++;
    nextQuestion();
  } else {
    nextQuestion();
  }

  if (e.target.value === "true") {
    rightWrong.innerText = "Correct!";
    score += 20;
    document.getElementById("score").innerHTML = score;
  } else {
    rightWrong.innerText = "Wrong!";
  }
  console.log(score);
}
//the score is updated by 20 for each correct answer, not updated is wrong

// 10 seconds removed for wrong answer

const questions = [
  {
    question: "1. Commonly used data types DO NOT include:",
    answers: [
      { text: "strings", correct: false },
      { text: "boolean", correct: false },
      { text: "alerts", correct: true },
      { text: "numbers", correct: false },
    ],
  },
  {
    question:
      "2. The condition in an if/else statement is enclosed within _________.",
    answers: [
      { text: "quotes", correct: false },
      { text: "curly brackets", correct: false },
      { text: "parentheses", correct: true },
      { text: "square brackets", correct: false },
    ],
  },
  {
    question: "3. Arrays in JavaScript can be used to store ______.",
    answers: [
      { text: "numbers", correct: false },
      { text: "strings", correct: false },
      { text: "other arrays", correct: false },
      { text: "all of the above", correct: true },
    ],
  },
  {
    question:
      "4. String values must be enclosed within______ when being assigned to variables.",
    answers: [
      { text: "commas", correct: false },
      { text: "curly brackets", correct: false },
      { text: "quotes", correct: true },
      { text: "parentheses", correct: false },
    ],
  },
  {
    question:
      "5. A useful tool used during development and debugging for printing content ot the debugger is: ",
    answers: [
      { text: "JavaScript", correct: false },
      { text: "Terminal", correct: false },
      { text: "for loops", correct: false },
      { text: "console.log", correct: true },
    ],
  },
];

// unerneath the next question the text displays "correct" or "wrong" based on the users selection on the previous question
//3. When an incorrect  question is answered 10 secons is removed from the timer
//4. after the last question
// clculate the score on the quiz
// the quiz score is displayed
// user is asked to enter their initials on a form for the high score list
// submit button next to user form
//submits user initials and scoore to high score list
// updates page to diplay list of high scores
//5. high score display
//button to clear high scores
// "go back" button that takes user back to start page
