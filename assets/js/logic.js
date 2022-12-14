// sound effects
let sfxRight = new Audio("assets/sfx/correct.wav");
let sfxWrong = new Audio("assets/sfx/incorrect.wav");

// global varibles

let countDown = 75;
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

    bt.addEventListener('click',(event) => {
        
        //capture key event data
        let key = event.target.textContent;
        let type = event.type;
        let indexOfButtonPressed = event.target.dataset.index--;
        let answer = questions[questionCounter].answer
        let correct = false;

        //conditions depending on whether correct answer is selected

        if (indexOfButtonPressed ===answerIndex) {
            correct = true;
            sfxRight.play();
            questionFeedback.textContent = rightAnswer;
            questionFeedback.classList.remove('hide');
        } else {
            sfxWrong.play();
            countDown -= 15;
            questionFeedback.textContent = wrongAnswer;
            questionFeedback.classList.remove('hide');
        }

        //push userAnswers to an array (may use this data if further metrics required for analysis)

        userAnswers.push([key, indexOfButtonPressed, answer, correct, countDown]);
        questionCounter++;
    
        //set 1 sec delay to ensure that feedback becomes visible for at least 1 second

        setTimeout(() => {

        //remove content and execute function again if more questions left

        questionTitle.innerHTML = "";
        questionChoices.innerHTML = "";
        presentQuestions();

        }, 1000);

        clearTimeout();
        
    })

}

}

questionFeedback.classList.add('hide');

}


//Timer element

function timerFunction() {

    presentQuestions()

// Update the count down every 1 second
let x = setInterval(function() {

    endCounter = false;

    countDown--;
    timer.textContent = countDown;
    
    
    if (countDown <= 0 || userAnswers.length === totalQuestions) {
        endCounter = true;
        score = countDown;
    }
    
  // If the count down is over, write some text 
  if (endCounter) {
    clearInterval(x);
    captureUserHighScore()
  }
}, 1000);

}

startButton.addEventListener('click',timerFunction);



//Capture highscores and save to location storage


function captureUserHighScore() {

    let input;
    let rejectArray = /[0-9/!"??$%^&*()-_=+?><.,"]/g;

    startScreen.classList.add('hide');
    endScreen.classList.remove('hide');
    questionsWrapper.classList.add('hide');
    finalScore.textContent = score;
    playerInitials.setAttribute("placeholder", "Enter up to 3 letters");

    submitInitials.addEventListener('click', function(event) {

        event.preventDefault();

        var storage = localStorage.getItem("highScores");
        var storageArr = JSON.parse(storage);

        input = playerInitials.value;
        let highscore = [input,score];

        let array = [];
        array.push(highscore);

        if (storageArr != null) {

        storageArr.forEach(arr => {
            array.push(arr);
        })      
        
        }

        //reject invalid input

        regexArray = input.toLowerCase().match(rejectArray);

        if (regexArray !== null) {
            alert("You cannot use special characters or numbers");
            playerInitials.value = '';
            return;
        } else if (input.length > 3) {
            alert("Max length exceeded. Please try again");
            playerInitials.value = '';
            return;
        }

        //sort top 10 and store to local storage

        let sortedArray = array.sort((pre,post) => (pre[1] > post[1] ? -1 : 1)).slice(0,10);
           
        localStorage.setItem("highScores",JSON.stringify(sortedArray));

          window.location.href = './highscores.html';      
  
    })


};
