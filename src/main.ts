import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Alien Clicker";
document.title = gameName;

const header = document.createElement("HIIIII");
header.innerHTML = gameName;
app.append(header);
//Step 1: Adding a click button
const b1 = document.createElement("button");
b1.className = "button";
b1.textContent = "👽";
app.append(b1);

//Step 2: Adding a click score
const score: HTMLDivElement = document.querySelector("#score")!;
let counter = 0;
const s = document.createElement("Score");
b1.addEventListener("click", function () {
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
  counter += 1 / fps;
  s.textContent = counter.toFixed(5) + " Aliens";
  score.append(s);
  requestAnimationFrame(update);
}
requestAnimationFrame(update);

//Step 5: Growth Rate Button
const grow: HTMLDivElement = document.querySelector("#grow")!;
const b2 = document.createElement("button");
b2.className = "button";
b2.textContent = "💲";
let mul = 0;
grow.append(b2);
const g = document.createElement("Score");
b2.disabled = true;
function check(){
    if(counter<10){
        b2.disabled = true;
    }
    if(counter>=10){
        b2.disabled = false;
    }
    requestAnimationFrame(check);
}
requestAnimationFrame(check);

b2.addEventListener("click", function () {
    if(counter >= 10){
        mul++;
        counter -= 10;
    }
    g.textContent = "Growth Rate: " + mul;
    grow.append(g);
});
