const url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

// let Retrieve = async()=>{
//     let daata = await fetch(url);
//     let data = await daata.json(); //to test whether the url is working or not
//     let amt = data['usd'].inr;
// };
// Retrieve();

for(let select of dropdowns){
    for(Currcode in countryList){
        let option = document.createElement("option");
        option.innerText = Currcode;// you will create an element cotaining all currcode and you will append this elemnt to select
        option.value = Currcode;
        select.append(option);
        if(select.name === "from" && Currcode === "USD"){
            option.selected = "selected";// instead selected you can write true
        } else if (select.name === "to" && Currcode === "INR"){
            option.selected = "selected";
        }
        // select.innerText=Currcode;
        // select.value = Currcode; this will not add Currcode directly 
        // console.log(Currcode,countryList[Currcode]);
    };
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
};

let updateflag = (element)=>{
    imgsrc =`https://flagsapi.com/${countryList[element.value].toUpperCase()}/flat/64.png`;
    let img = element.parentElement.querySelector('img');// if we write only queyselectorall it selects all the images in the file so every img will be replaced no matter from and to
    img.src=imgsrc;
};                  


btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();//this prevents frequent refresh of the page
    let input = document.querySelector(".amount input");
    let amval = input.value;//input value
    if(amval === "" || amval < 1){
        amval = 1;
        input.value = "1";//rewrites to 1
    }


    const final_url = `${url}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(final_url);
    let data = await response.json();

    let fromvalue =fromCurr.value.toLowerCase();// as in rate these can't be accessed directly
    let tovalue =toCurr.value.toLowerCase();
    let rate = data[fromvalue][tovalue];
    // console.log(rate);

    let final_exchange_rate = rate * amval;
    //console.log(final_exchange_rate);

    let msg = document.querySelector(".msg p");
    msg.innerText = `${amval} ${fromCurr.value} = ${final_exchange_rate} ${toCurr.value}`; 
   

});

