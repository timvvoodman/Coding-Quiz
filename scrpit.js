//defaul page load displays Title of coding quiz and a start button

const startButton = document.getElementById('start-btn')
const startScreen = document.getElementById('start-screen')
const questionContainerEl = document.getElementById('question-container')
const questionEl = document.getElementById('question')
const answerButtonsEL = document.getElementById('answer-buttons')
const rightWrong = document.getElementById('alertUser')
const scoreContainer = document.getElementById('score-container')
const finalScore = document.getElementById('score')
const submitScore = document.getElementById('submitHighScore')
const clearScore = document.getElementById('clear')

let listQuestions, currentQuestionIndex, button
let score = 0
//1. When user presses start quiz....
startButton.addEventListener('click', startQuiz)

// the first question displays
function startQuiz() {
  startTimer()
  startScreen.classList.add('hide')
  listQuestions = questions.sort()
  currentQuestionIndex = 0
  questionContainerEl.classList.remove('hide')
  nextQuestion()
}

//function to end Quiz
function endQuiz() {
  startButton.classList.add('hide')
  questionContainerEl.classList.add('hide')
  scoreContainer.classList.remove('hide')
  rightWrong.classList.add('hide')
}

// a timer starts for 60 seconds
function startTimer() {
  console.log('timer started')
  let sec = 30
  const timer = setInterval(function () {
    if (sec === 0) {
      clearInterval(timer)
      endQuiz()
    }
    document.getElementById('time-display').innerHTML = '00:' + sec
    sec--
  }, 1000)
}

//Move to next question function
function nextQuestion() {
  resetQuestions()
  showQuestion(listQuestions[currentQuestionIndex])
}

//Display Question functionality
function showQuestion(question) {
  questionEl.innerText = question.question
  question.answers.forEach((answer) => {
    button = document.createElement('button')
    button.innerText = answer.text
    button.value = answer.correct
    button.classList.add('btn')
    button.addEventListener('click', selectAnswer)
    answerButtonsEL.appendChild(button)
  })
}
//reset answer buttons
function resetQuestions() {
  while (answerButtonsEL.firstChild) {
    answerButtonsEL.removeChild(answerButtonsEL.firstChild)
  }
}

//2. When the user clicks (selects) an answer
function selectAnswer(e) {
  //the score is updated by 20 for each correct answer, not updated is wrong
  // unerneath the next question the text displays "correct" or "wrong" based on the users selection on the previous question
  if (e.target.value === 'true') {
    rightWrong.innerText = 'Correct!'
    score += 20
  } else {
    rightWrong.innerText = 'Wrong!'
  }
  //moves to next question automatically
  if (currentQuestionIndex <= 3) {
    currentQuestionIndex++
    nextQuestion()
  } else if ((currentQuestionIndex = 4)) {
    // the quiz score is displayed

    endQuiz()
    finalScore.innerHTML =
      ' Your score is ' +
      score +
      '. Enter your intials for the leaderboard! Did you break the top 10?'
  } else {
    nextQuestion()
  }
}

// user is asked to enter their initials on a form for the high score list
submitScore.addEventListener('click', saveScore)

//saves new score and displays the 10 highest scores from the local storage array
function saveScore(event) {
  event.preventDefault()
  let initials = document.getElementById('initials').value.trim()
  if (initials !== '') {
    const highscores =
      JSON.parse(window.localStorage.getItem('highscores')) || [] // get score or initial empty array

    const newScore = {
      //format new score
      score: score,
      initials: initials,
    }
    console.log(highscores)
    //save to local sotrage
    highscores.push(newScore)
    window.localStorage.setItem('highscores', JSON.stringify(highscores))

    displayScores()
  }

  //display Scores in the UI functionality
  function displayScores() {
    const highscores =
      JSON.parse(window.localStorage.getItem('highscores')) || []

    highscores
      .sort((a, b) => b.score - a.score) //sort decending
      .slice(0, 10) //take only the top 10

    highscores.forEach((score) => {
      //create new li for each score
      let listItem = document.createElement('li')
      listItem.textContent = score.initials + ': ' + score.score + '%'

      //display new li tag
      const scoreList = document.getElementById('score-list')
      scoreList.appendChild(listItem)
    })
  }
}

//clear high scores and return to start
document.getElementById('clear').onclick = clearHighscores
function clearHighscores() {
  window.localStorage.removeItem('highscores')
  window.location.reload()
}

const questions = [
  {
    question: '1. Commonly used data types DO NOT include:',
    answers: [
      { text: 'strings', correct: false },
      { text: 'boolean', correct: false },
      { text: 'alerts', correct: true },
      { text: 'numbers', correct: false },
    ],
  },
  {
    question:
      '2. The condition in an if/else statement is enclosed within _________.',
    answers: [
      { text: 'quotes', correct: false },
      { text: 'curly brackets', correct: false },
      { text: 'parentheses', correct: true },
      { text: 'square brackets', correct: false },
    ],
  },
  {
    question: '3. Arrays in JavaScript can be used to store ______.',
    answers: [
      { text: 'numbers', correct: false },
      { text: 'strings', correct: false },
      { text: 'other arrays', correct: false },
      { text: 'all of the above', correct: true },
    ],
  },
  {
    question:
      '4. String values must be enclosed within______ when being assigned to variables.',
    answers: [
      { text: 'commas', correct: false },
      { text: 'curly brackets', correct: false },
      { text: 'quotes', correct: true },
      { text: 'parentheses', correct: false },
    ],
  },
  {
    question:
      '5. A useful tool used during development and debugging for printing content ot the debugger is: ',
    answers: [
      { text: 'JavaScript', correct: false },
      { text: 'Terminal', correct: false },
      { text: 'for loops', correct: false },
      { text: 'console.log', correct: true },
    ],
  },
]

//4. after the last question

// submit button next to user form
//submits user initials and score to high score list
// updates page to diplay list of high scores
//5. high score display
//button to clear high scores
// "go back" button that takes user back to start page
