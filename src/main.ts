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

//Step 9: Data-driven design
interface Item {
    name: string,
    symbol: string,
    cost: number,
    rate: number,
    button: HTMLButtonElement,
    tracker: number,
    text: HTMLElement
  };
  
const availableItems : Item[] = [
    {name: "🚀 Rocket", symbol: "🚀", cost: 10, rate: 0.1, button: document.createElement("button"), tracker: 0, text: document.createElement("Price")},
    {name: "🛸 UFO", symbol: "🛸", cost: 100, rate: 2, button: document.createElement("button"), tracker: 0, text: document.createElement("Price")},
    {name: "👾 Galaxy", symbol: "👾", cost: 1000, rate: 50, button: document.createElement("button"), tracker: 0, text: document.createElement("Price")},
];
const g = document.createElement("Growth");
for (const items of availableItems){
    items.button.className = "button";
    items.button.textContent = items.name;
    grow.appendChild(items.button);
    items.button.addEventListener("click", function(){
        mul += items.rate;
        counter -= items.cost;
        items.cost = items.cost * 1.15;
        items.tracker++;
    });
    function checkButton() {
        if (counter < items.cost) {
          items.button.disabled = true;
        } else {
          items.button.disabled = false;
        }
        items.text.innerText = "-" + items.cost.toFixed(2) + " Aliens = +" + items.rate + " Aliens/sec : " + items.tracker + items.symbol + "\n";
        shop.append(items.text);
        g.innerText = "Growth Rate : " + mul.toFixed(1) + " Aliens/sec\n";
        shop.append(g)
        requestAnimationFrame(checkButton);
    }
    requestAnimationFrame(checkButton);  
}