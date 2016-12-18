var url = "ws://localhost:8080/ChatServer/chatserver";
var ws = new WebSocket(url);
function sendMessage() {
    ws.send(messageInput.value);
    messageInput.value = "";
}
ws.onmessage = function process(message) {
    var jsondata = JSON.parse(message.data);
    if (Array.isArray(jsondata)) { //Array = users
        var output = "";
        for (var i = 0; i < jsondata.length; i++) {
            output += jsondata[i].username + "\n";
        }
        usersTextArea.value = output;
    }

    if (jsondata.message === "/game") {

        messageTextArea.value += playGame() + "\n";

    } else {
        messageTextArea.value += jsondata.username + ":" + jsondata.message + "\n";
    }
};

function playGame(){

var choices = ["rock", "paper", "scissors"];
var computerChoice = choices[Math.floor(Math.random() * 3)];
var userChoice;

do {
  userChoice = prompt("Type your choice in lower case letters: " + choices);
} while (choices.indexOf(userChoice) < 0);

var result = 'You choosed: "' + userChoice + '", Computer choosed: "' + computerChoice + '". ';

    if (userChoice === computerChoice) {
  result += 'The game is a tie!';
  
} else {
  var victory = "You win! congratulations";
  if (userChoice === "rock" && computerChoice === "scissors") {
    result += victory;
  } else if (userChoice === "paper" && computerChoice === "rock") {
    result += victory;
  } else if (userChoice === "scissors" && computerChoice === "paper") {
    result += victory;
  } else {
    result += "You lost unfortunately";
  }
}

return result;
console.log(result);
}