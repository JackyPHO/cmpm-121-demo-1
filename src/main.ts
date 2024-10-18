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
  const fps = (1000 / delta);
  counter = (counter + mul / fps);
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
p1.innerText = "-10 Aliens = +0.1 Aliens/sec: \n";
p2.innerText = "-100 Aliens = +2.0 Aliens/sec: \n";
p3.innerText = "-1000 Aliens = +50 Aliens/sec: \n";

const g = document.createElement("Growth");
g.textContent = "Growth Rate : " + mul.toFixed(1) + " Aliens/sec";
shop.append(p1);
shop.append(p2);
shop.append(p3);
shop.append(g);


const b2 = document.createElement("button");
b2.className = "button";
b2.textContent = "🚀";
grow.appendChild(b2);
b2.addEventListener("click", function () {
    mul += 0.1;
    counter -= 10;
    q1++;
    p1.innerText = "-10 Aliens = +0.1 Aliens/sec: " + q1 + "\n";
    updateText()
});


const b3 = document.createElement("button");
b3.className = "button";
b3.textContent = "🛸";
grow.appendChild(b3);
b3.addEventListener("click", function () {
    mul += 2;
    counter -= 100;
    q2++;
    p2.innerText = "-100 Aliens = +2.0 Aliens/sec: " + q2 + "\n";
    updateText()
});

const b4 = document.createElement("button");
b4.className = "button";
b4.textContent = "👾";
grow.appendChild(b4);
b4.addEventListener("click", function () {
    mul += 50;
    counter -= 100;
    q3++;
    p3.innerText = "-1000 Aliens = +50 Aliens/sec: " + q3 + "\n";
    updateText()
});
function updateText() {
    g.textContent = "Growth Rate : " + mul.toFixed(1) + " Aliens/sec";
    shop.append(p1);
    shop.append(p2);
    shop.append(p3);
    shop.append(g);
}
function checkButton(){
    if(counter < 10){
        b2.disabled = true;
    }else{
        b2.disabled = false;
    }
    if(counter < 100){
        b3.disabled = true;
    }else{
        b3.disabled = false;
    }
    if(counter < 1000){
        b4.disabled = true;
    }else{
        b4.disabled = false;
    }
    requestAnimationFrame(checkButton);
}
requestAnimationFrame(checkButton);