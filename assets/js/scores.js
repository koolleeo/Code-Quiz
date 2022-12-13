//get scores from local storage

function displayScores() {

    let storage = localStorage.getItem("highScores");
    let storageArr = JSON.parse(storage);
    
    //render high scores to page
    
    let highscores = document.getElementById("highscores");
    
    storageArr.forEach(arr => {
    
        let li = document.createElement("li");
        li.textContent = `${arr[0].toUpperCase()} : ${arr[1]}`;
        highscores.appendChild(li);
    
    })
    
    //clear highscores when button clicked
    
    let clearScore = document.getElementById("clear");
    
    clearScore.addEventListener('click',(event)=> {
       
        event.stopPropagation();
    
        //remove HTML elements
        
        highscores.innerHTML = '';
    
        //set local storage variable to empty array[]
    
        localStorage.setItem("highScores",JSON.stringify([]));
    })
    
    }
    
    displayScores();