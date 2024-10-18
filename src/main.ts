import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Alien Clicker";
document.title = gameName;

const header = document.createElement("HIIIII");
header.innerHTML = gameName;
app.append(header);
//Step 1: Adding a click button
const button = document.createElement("button");
button.className = "button";
button.textContent = "👽";
app.append(button);

//Step 2: Adding a click score
const score: HTMLDivElement = document.querySelector("#score")!;
let counter = 0;
const s = document.createElement("Score");
button.addEventListener("click", function () {
  counter++;
  s.textContent = counter + " Aliens Spawned";
    score.append(s);
});

//Step 3: Add 1 every second on top of the click score
function update(){
    counter++;
    s.textContent = counter + " Aliens Spawned";
    score.append(s);
}
setInterval(update, 1000);

