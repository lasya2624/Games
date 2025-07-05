let boxes = document.querySelectorAll(".box button");
let button = document.querySelector(".btn");
let newgame = document.querySelector(".buttn");
let msg_container = document.querySelector(".greetings");
let msg = document.querySelector(".greetings p");
let turnO = "true";
const winpatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];
const disablebox=()=>{
    for(box of boxes){
        box.disabled=true;
    }
}
const enablebox=()=>{
    for(box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}
boxes.forEach((box)=>{
    //console.log(box);
    box.addEventListener("click",()=>{
        //console.log(box);
        if(turnO === "true"){
            box.innerText = "O";
            turnO ="false";
        } else{
            box.innerText = "X";
            turnO ="true";
        }
        findpattern();
        
    });
});
const showwinner=(match1)=>{
    msg.innerText=`Congratulations, Winner is ${match1}`;
    msg_container.classList.remove("hide");
    disablebox();
}
const findpattern=()=>{
    for (pattern of winpatterns){
        //console.log(pattern[0],pattern[1],pattern[2]);// for each pattern
        let match1 = boxes[pattern[0]].innerText;
        let match2 = boxes[pattern[1]].innerText;
        let match3 = boxes[pattern[2]].innerText;  // we are passing the patterns in the box so box 0,box 1,box 2 will be selected paralley
        if(match1!="" && match2!="" && match3!=""){
            if(match1 === match2 && match2 === match3){
                //console.log(`winner is ${match1}`);
               showwinner(match1);
                
            }
        }
    }

}
button.addEventListener("click",()=>{
    enablebox();
});
newgame.addEventListener("click",()=>{
    enablebox();
});