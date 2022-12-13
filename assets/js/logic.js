// sound effects
let sfxRight = new Audio("assets/sfx/correct.wav");
let sfxWrong = new Audio("assets/sfx/incorrect.wav");

// global varibles

let countDown = 25;
let deduct = 15;
let questionCounter = 0;
let totalQuestions = questions.length;
let score = 0;
let endCounter = false;

let wrongAnswer = 'Wrong!';
let rightAnswer = 'Correct!';
let userAnswers = [];

// document variables

let timer = document.getElementById("time");
let startButton = document.getElementById("start");
let wrapper = document.querySelector('.wrapper');
let startScreen = document.getElementById("start-screen") // default : class="start"
let questionsWrapper = document.getElementById("questions")   // default : class="hide"
let questionTitle = document.getElementById("question-title")
let questionChoices = document.getElementById("choices")   // class="choices"
let endScreen = document.getElementById("end-screen") // default : class="hide"
let finalScore = document.getElementById("final-score");
let playerInitials = document.getElementById("initials"); 
let submitInitials = document.getElementById("submit");
let questionFeedback = document.getElementById("feedback") // default : class="feedback hide"
