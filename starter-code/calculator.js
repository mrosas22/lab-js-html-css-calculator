// let runningTotal = 0;
// let buffer = '0';
// let previousOperator;
// const screen = document.querySelector('.screen');

//name variables
let runningTotal = 0;
let operator;
let buffer = "0";
// use null value to account for previous operator
let previousOperator = null
const screen = document.querySelector(".screen");

//Manage input
function buttonClick(value){
  console.log(value);
  if(isNaN(parseInt(value))){
    handleSymbol(value);
  }else{
    handleNumber(value);
  }
  rerender()
}

//Manage number
function handleNumber(value){
  if(buffer === "0"){
    buffer = value;
  }else{
  buffer += value;
  }
  rerender();
}

//handle symbol
function handleSymbol(value){
  switch (value){
    case "C":
      runningTotal = 0;
      buffer = "0";
      previousOperator = null;
      break;
    case "=":
      if(previousOperator === null){
        return;
      }
      //pass Buffer value while previous operator is null 
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if(buffer.length === 1){
        buffer = "0";
      }else{
        //extracts one character from string buffer
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
   
    default:
      handleMath(value);
      break;
  }
}

//create the intBuffer variable to handle the buffer while the operation if peformed
function handleMath(value){
  const intBuffer = parseInt(buffer);
  if(runningTotal === 0){
    runningTotal = intBuffer;
  }else{
    flushOperation(intBuffer);
  }
  previousOperator = value;
  buffer = "0";
}

//use of operators
function flushOperation(intBuffer){
  if (previousOperator === "+"){
    runningTotal += intBuffer;
  }else if(previousOperator === "-"){
    runningTotal -= intBuffer;
  }else if(previousOperator === "×"){
    runningTotal *= intBuffer;
  }else{
    runningTotal /= intBuffer;
  }

}

//print what's on the buffer in the screen
function rerender(){
  screen.innerText = buffer;
}

//alert JavScript to act open interaction with the buttons
function init() {
    document.querySelector(".calc-buttons").addEventListener("click", function(event) {
      buttonClick(event.target.innerText);
    });
  }

init();

  