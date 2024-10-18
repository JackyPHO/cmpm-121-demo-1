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
button.addEventListener("click", function(){
    counter++;
    s.textContent = counter + " Aliens";
    score.append(s);
});

//Step 4: Add 1/framerate on top of the click score
let last = performance.now();
function update(timestamp: number) {
  const delta = timestamp - last;
  last = timestamp;
  const fps = 1000 / delta;
  counter += 1/fps;
  s.textContent = counter.toFixed(5) + " Aliens";
  score.append(s);
  requestAnimationFrame(update);
}
requestAnimationFrame(update);

