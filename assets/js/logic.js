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


// present questions

function presentQuestions() {

    let title;
    let bt;

if (questionCounter < totalQuestions && endCounter === false) {

    //change classes within HTML to unhide questions and hide feedback
    startScreen.classList.add('hide');
    questionsWrapper.classList.remove('hide');
    questionFeedback.classList.add('hide');

    //find the index of the correct answer from the choices array
    let questionsArr = questions[questionCounter].choices;
    let answerIndex = questionsArr.indexOf(questions[questionCounter].answer);


for (let i = 0; i < questions[questionCounter].choices.length; i++) {

    //render questions title
    title = questions[questionCounter].title;
    questionTitle.textContent = title;

    //create button element and add question as content
    bt = document.createElement('button');
    bt.textContent = `${i+1}: ${questions[questionCounter].choices[i]}`;

    //render button to page
    questionChoices.appendChild(bt);
    bt.dataset.index = i;

}

}

}

presentQuestions()