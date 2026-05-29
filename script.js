const startBtn = document.getElementById( "startBtn");
const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById( "quizScreen");
const resultScreen = document.getElementById("resultScreen");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const questionCountEl = document.getElementById("questionCount");
const nextBtn = document.getElementById("nextBtn");
const quitBtn = document.getElementById("quitBtn");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const progressFill = document.getElementById("progressFill");
const resultText = document.getElementById("resultText");
const resultTitle = document.getElementById("resultTitle");
const restartBtn = document.getElementById("restartBtn");

const questions = [

  {
    question:
      "What does HTML stand for?",

    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyper Transfer Main Language",
      "Hyper Tool Multi Language"
    ],

    answer:
      "Hyper Text Markup Language"
  },

  {
    question:
      "Which planet is known as the Red Planet?",

    options: [
      "Earth",
      "Mars",
      "Jupiter",
      "Venus"
    ],

    answer:
      "Mars"
  },

  {
    question:
      "Which language is used for styling web pages?",

    options: [
      "Python",
      "HTML",
      "CSS",
      "Java"
    ],

    answer:
      "CSS"
  },

  {
    question:
      "Who is the founder of HackClub?",

    options: [
      "Jack Latta",
      "Archit Raj",
      "Zach Latta",
      "Euan Ripper"
    ],

    answer:
      "Zach Latta"
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;
let answered = false;

function startTimer() {

  clearInterval(timer);
  timeLeft = 15;
  timerEl.innerText = timeLeft + "s";

  timer = setInterval(function() 
    {

      timeLeft--;
      timerEl.innerText = timeLeft + "s";

      if (timeLeft <= 0) {

        clearInterval(timer);
        nextQuestion();
      }
    }, 1000);
}

function updateProgress() {

  const progress = (currentQuestion / questions.length) * 100;
  progressFill.style.width = progress + "%";
}

function loadQuestion() {

  answered = false;

  const data = questions[currentQuestion];

  questionCountEl.innerText = "Question " + (currentQuestion + 1) + " / " + questions.length;
  questionEl.innerText = data.question;

  optionsEl.innerHTML = "";

  data.options.forEach(option => {

    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.innerText = option;

    btn.addEventListener("click", function() {

        checkAnswer(option, btn);
    });

    optionsEl.appendChild(btn);
  });

  updateProgress();
  startTimer();
}

function checkAnswer(selected, clickedBtn) {

  if (answered) return;

  answered = true;
  clearInterval(timer);
  const correct = questions[currentQuestion].answer;
  const allButtons = document.querySelectorAll(".option-btn");

  allButtons.forEach(btn => {

    btn.disabled = true;

    if (btn.innerText === correct) {

      btn.classList.add("correct");
    }
  });

  if (selected === correct) {

    score++;
    scoreEl.innerText = "Score: " + score;
  }

  else {
    clickedBtn.classList.add("wrong");
  }
}

function nextQuestion() {

  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  }

  else {
    showResult();
  }
}

function showResult() {

  clearInterval(timer);

  quizScreen.style.display = "none";
  resultScreen.style.display = "block";
  resultText.innerText = "You scored " + score + "/" + questions.length;

  if(score === questions.length) {
    resultTitle.innerText = "Perfect Score";
  }

  else if(score >= 2) {
    resultTitle.innerText = "Great Job";
  }

  else {
    resultTitle.innerText = "Nice Try";
  }

}

startBtn.addEventListener("click", function() {

    startScreen.style.display = "none";
    quizScreen.style.display = "block";
    loadQuestion();
});

nextBtn.addEventListener("click", function() {
    nextQuestion();
});

quitBtn.addEventListener("click", function() {

    location.reload();
});

restartBtn.addEventListener("click", function() {

    location.reload();
});