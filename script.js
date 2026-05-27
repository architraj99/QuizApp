const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const questionCountEl = document.getElementById("questionCount");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");

const questions = [

  {
    question: "What does HTML stand for?",

    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyper Transfer Main Language",
      "Hyper Tool Multi Language"
    ],

    answer: "Hyper Text Markup Language"
  },

  {
    question: "Which planet is known as the Red Planet?",

    options: [
      "Earth",
      "Mars",
      "Jupiter",
      "Venus"
    ],

    answer: "Mars"
  },

  {
    question: "Which language is used for styling web pages?",

    options: [
      "Python",
      "HTML",
      "CSS",
      "Java"
    ],

    answer: "CSS"
  }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {

  const data = questions[currentQuestion];

  questionCountEl.innerText = "Question " + (currentQuestion + 1) + " / " + questions.length;
  questionEl.innerText = data.question;
  optionsEl.innerHTML = "";

  data.options.forEach(option => {

    const btn = document.createElement("button");

    btn.classList.add("option-btn");
    btn.innerText = option;

    btn.addEventListener("click", function() {

        checkAnswer(option);
    }); 

    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selected) {

  const correct = questions[currentQuestion].answer;

  if (selected === correct) {

    score++;
    scoreEl.innerText = "Score: " + score;
  }
}

nextBtn.addEventListener("click", function() {

    currentQuestion++;

    if ( currentQuestion < questions.length) {

      loadQuestion();
    }
});

startBtn.addEventListener("click", function () {

    startScreen.style.display = "none";
    quizScreen.style.display = "block";

    loadQuestion();
});