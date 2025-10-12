const qa = document.querySelector(".qa");
const choices = document.querySelector(".choices");
const container = document.querySelector(".container");
const btn = document.querySelector(".btn");
const msg = document.querySelector(".msg");
const head = document.querySelector(".h1");
const timer = document.querySelector(".timer");

// quiz questions
const questions = [
    {   question: "Q.  What does the z-index property in CSS control?",
        choice:["The zoom level of an element","The stacking order of overlapping elements", "The size of the text","The width of an element"],
        answer:"The stacking order of overlapping elements"
    },
    {
        question:"Q. Which CSS property is used to change the text color of an element?",
        choice:["font-color","text-style","color","text-color"],
        answer:"color"
    },
    {
        question:"Q. What is the default position value of an HTML element?",
        choice:["relative","absolute","fixed","static"],
        answer:"static"
    },
    {
        question:"Q. What does the display: flex; property do?",
        choice:["Hides the element","Aligns text to the center","Converts a container into a flex container for flexible layouts"," Adds a border around the element"],
        answer:"Converts a container into a flex container for flexible layouts"
    }
]

//intializing
let questionIndex=0;
let score = 0;
let QuizCompleted = false;
let timeLeft = 15;
let countdown;

//setting initial state
btn.textContent="Start";
qa.style.display ="none";
choices.style.display ="none";
head.style.display ="none";
msg.style.display = "block";
timer.style.display = "none";



//setting timer


// adding questions to the container
const addQuestion=()=>{
    qa.textContent= questions[questionIndex].question;
    choices.textContent="";
    choices.value="";
    for(i=0;i<questions.length;i++){
        let choicediv = document.createElement('div');
        choicediv.textContent=questions[questionIndex].choice[i];
        choicediv.value = questions[questionIndex].choice[i]
        choicediv.classList.add('choice');
        choices.appendChild(choicediv);
    }
    if(questionIndex === questions.length-1){
        btn.textContent = "Finish";
    }
    startTimer();

}

// selecting the answer
choices.addEventListener("click",(event)=>{
    msg.style.display ="block";
    event.target.style.backgroundColor = "rgba(68, 169, 211, 1)";
    choices.value = event.target.value;
    if(event.target.value === questions[questionIndex].answer){
        msg.style.backgroundColor="green";
        msg.style.height = "50px";
        msg.textContent="correct answer";
        msg.style.transition = "0.5s ease 0s";
        msg.style.color = "white";
        msg.style.fontSize = "38px";
        score++;
        clearInterval(countdown);
    }
    else{
        msg.textContent="wrong answer";
        msg.style.backgroundColor="red";
        msg.style.height = "50px";
        msg.style.color = "white";
        msg.style.fontSize = "38px";
        msg.style.transition = "0.5s ease 0s";
    }
    if(questionIndex != questions.length-1){
        setTimeout(()=>{
            msg.style.display = "none";
        },1000);
    }
})

// Event Listener for next button
addQuestion();
btn.addEventListener("click",()=>{
    if(btn.textContent === "Start"){
        questionIndex = 0;
        score = 0;
        QuizCompleted = false;
        msg.style.display = "none";
        choices.style.display = "block";
        head.style.display = "block";
        qa.style.display = "block";
        btn.textContent = "Next";
        timer.style.display ="block";
        
        addQuestion();
    }
    if(btn.textContent === "Play Again"){
        questionIndex = 0;
        score = 0;
        QuizCompleted = false;
        msg.style.display = "none";
        choices.style.display = "block";
        head.style.display = "block";
        qa.style.display = "block";
        btn.textContent = "Next";
        addQuestion();
    }
    if(choices.value === "" && questionIndex!= 0){
        msg.style.display = "block";
        msg.textContent = "please select the answer";
        msg.style.backgroundColor = "rgb(2, 136, 143)";
        msg.style.height = "50px";
        msg.style.color = "white";
        msg.style.fontSize = "38px";
    }
    else if (questionIndex === questions.length-1){
        qa.style.display ="none";
        choices.style.display ="none";
        head.style.display ="none";
        msg.style.display = "block";
        msg.textContent = `Quiz completed! your score is ${score} out of ${questions.length}`;
        msg.style.alignItems = "center";
        msg.style.backgroundColor ="rgb(2, 136, 143)";
        btn.textContent="Play Again";
        btn.style.width = "200px";
        QuizCompleted = true;
        timer.style.display ="none";
    }
    
    else{
        questionIndex++;
        addQuestion();
    }
})

function startTimer() {
    clearInterval(countdown); // stop old timer if any
    timeLeft = 15;
    timer.textContent = timeLeft;
    countdown = setInterval(() => {
        timeLeft--;
        timer.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            msg.style.display = "block";
            msg.textContent = "Time's up!";
            msg.style.backgroundColor = "orange";
            msg.style.color = "white";
            msg.style.height = "50px";
            msg.style.fontSize = "38px";

            setTimeout(() => {
                msg.style.display = "none";
                if (questionIndex < questions.length - 1) {
                    questionIndex++;
                    addQuestion();
                    startTimer();
                }
            }, 1000);
        }
    }, 1000);
}
