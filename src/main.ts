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
let mul = 1;

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
  counter = counter + mul / fps;
  s.textContent = counter.toFixed(5) + " Aliens";
  score.append(s);
  requestAnimationFrame(update);
}
requestAnimationFrame(update);

//Step 6: Multiple upgrades and status
const grow: HTMLDivElement = document.querySelector("#grow")!;
const shop: HTMLDivElement = document.querySelector("#shop")!;

const p1 = document.createElement("Price1");
const p2 = document.createElement("Price2");
const p3 = document.createElement("Price3");
let q1 = 0;
let q2 = 0;
let q3 = 0;

//Step 7: Price increases
let c1 = 10;
let c2 = 100;
let c3 = 1000;

const g = document.createElement("Growth");
updateText();

//Step 8: Consistent narrative
const b2 = document.createElement("button");
b2.className = "button";
b2.textContent = "🚀 Rocket";
grow.appendChild(b2);
b2.addEventListener("click", function () {
  mul += 0.1;
  counter -= c1;
  c1 = c1 * 1.15;
  q1++;
  updateText();
});

const b3 = document.createElement("button");
b3.className = "button";
b3.textContent = "🛸UFO";
grow.appendChild(b3);
b3.addEventListener("click", function () {
  mul += 2;
  counter -= c2;
  c2 = c2 * 1.15;
  q2++;
  updateText();
});

const b4 = document.createElement("button");
b4.className = "button";
b4.textContent = "👾Galaxy";
grow.appendChild(b4);
b4.addEventListener("click", function () {
  mul += 50;
  counter -= c3;
  c3 = c3 * 1.15;
  q3++;
  updateText();
});
function updateText() {
  p1.innerText =
    "-" + c1.toFixed(2) + " Aliens = +0.1 Aliens/sec : " + q1 + "\n";
  p2.innerText =
    "-" + c2.toFixed(2) + " Aliens = +2.0 Aliens/sec : " + q2 + "\n";
  p3.innerText =
    "-" + c3.toFixed(2) + " Aliens = +50 Aliens/sec : " + q3 + "\n";
  g.textContent = "Growth Rate : " + mul.toFixed(1) + " Aliens/sec";
  shop.append(p1);
  shop.append(p2);
  shop.append(p3);
  shop.append(g);
}
function checkButton() {
  if (counter < 10) {
    b2.disabled = true;
  } else {
    b2.disabled = false;
  }
  if (counter < 100) {
    b3.disabled = true;
  } else {
    b3.disabled = false;
  }
  if (counter < 1000) {
    b4.disabled = true;
  } else {
    b4.disabled = false;
  }
  requestAnimationFrame(checkButton);
}
requestAnimationFrame(checkButton);
