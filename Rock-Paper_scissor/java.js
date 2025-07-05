let userscore=0;
let compscore=0;

let choices=document.querySelectorAll(".choice");
let msg = document.querySelector(".msg-container");
let user_Score = document.querySelector("#user-choice")
let comp_Score = document.querySelector("#comp-choice");

const gencompchoice=()=>{
    let options=["Rock","Paper","Scissor"];
    let idx =Math.floor(Math.random()*3);
    return options[idx];
};

const playgame=(userchoice,compchoice)=>{
    console.log("Your choice",userchoice);
    console.log("Comp choice",compchoice);
};

choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
        const userchoice= choice.getAttribute("id");
        let compchoice=gencompchoice();
        playgame(userchoice,compchoice);
        winner(userchoice,compchoice);
    });
});

const winner=(userchoice,compchoice)=>{
    
    if(userchoice===compchoice){
        //Draw Game
        console.log("It's a tie!");
        msg.textContent=`It's a tie!`;
        msg.style.backgroundColor="#173051";
    }
    else {
        let userwin=true;
        if(userchoice==="Rock"){
            //compchoice will be scissor or paper
            userwin = compchoice==="Scissor"? true : false;
        } else if(userchoice==="Paper"){
            //compchoice will be Rock or Scissor
            userwin = compchoice==="Rock"? true : false;
        }
        else{
            //userchoice = "scissor" and compchoice will be rock or paper
            userwin = compchoice==="Paper"? true : false;
        }
        show_winner(userwin,userchoice,compchoice);
    }
};

const show_winner=(userwin,userchoice,compchoice)=>{
    if(userwin){
        userscore++;
        user_Score.innerText=userscore;
        console.log("you win");
        msg.textContent=` You win! ,Your Choice ${userchoice} beats ${compchoice}`;
        msg.style.backgroundColor="green";
    }
    else {
        compscore++;
        comp_Score.textContent=compscore;
        console.log("you lose");
        msg.textContent=`You lose! , ${compchoice} beats Your Choice ${userchoice}`;
        msg.style.backgroundColor="red";
    }
    
}

