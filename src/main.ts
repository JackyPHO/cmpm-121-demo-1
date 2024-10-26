import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Alien Clicker";
document.title = gameName;
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

function newButton(name: string) {
  const button = document.createElement("button");
  button.className = "button";
  button.textContent = name;
  return button;
}
const clickButton = newButton("👽");
app.append(clickButton);
let GrowthRate = 1;

const score: HTMLDivElement = document.querySelector("#score")!;
let counter = 0;
const count = document.createElement("h2");
function updateCount() {
  count.textContent = counter.toFixed(5) + " Aliens";
  score.append(count);
}

clickButton.addEventListener("click", function () {
  counter++;
  updateCount();
});

let last = performance.now();
function update(timestamp: number) {
  const delta = timestamp - last;
  last = timestamp;
  const fps = 1000 / delta;
  counter = counter + GrowthRate / fps;
  updateCount();
  requestAnimationFrame(update);
}
requestAnimationFrame(update);

const buttonList: HTMLDivElement = document.querySelector("#grow")!;
const shop: HTMLDivElement = document.querySelector("#shop")!;
const multiplier = 1.15;
const growText = document.createElement("h2");

function getFirstCharacter(str: string): string {
  return Array.from(str)[0];
}

interface Item {
  name: string;
  cost: number;
  rate: number;
  tracker: number;
  text: HTMLElement;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "🚀 Rocket",
    cost: 10,
    rate: 0.1,
    tracker: 0,
    text: document.createElement("h2"),
    description: "Rockets Should Do the Trick",
  },
  {
    name: "🛸 UFO",
    cost: 100,
    rate: 2,
    tracker: 0,
    text: document.createElement("h2"),
    description: "UFO Can Speed Up the Process",
  },
  {
    name: "👾 ET",
    cost: 1000,
    rate: 50,
    tracker: 0,
    text: document.createElement("h2"),
    description: "Giant ET Boss To the Rescue",
  },
  {
    name: "🌌 Universe",
    cost: 10000,
    rate: 250,
    tracker: 0,
    text: document.createElement("h2"),
    description: "Let's Spread Across the Universe",
  },
  {
    name: "💫 Multiverse",
    cost: 500000,
    rate: 1000,
    tracker: 0,
    text: document.createElement("h2"),
    description: "MULTIVERSE OF MADNESS",
  },
];

for (const items of availableItems) {
  const shopButton = newButton(items.name);
  buttonList.appendChild(shopButton);
  shopButton.addEventListener("click", function () {
    GrowthRate += items.rate;
    counter -= items.cost;
    items.cost *= multiplier;
    items.tracker++;
  });
  function checkButton() {
    if (counter < items.cost) {
      shopButton.disabled = true;
    } else {
      shopButton.disabled = false;
    }
    items.text.innerHTML =
      "-" +
      items.cost.toFixed(2) +
      " Aliens = +" +
      items.rate +
      " Aliens/sec : " +
      items.tracker +
      getFirstCharacter(items.name) +
      "<br>" +
      "<i>" +
      items.description +
      "<i>" +
      "<br>" +
      "<br>";
    shop.append(items.text);
    growText.innerText =
      "Growth Rate : " + GrowthRate.toFixed(1) + " Aliens/sec";
    shop.append(growText);
    requestAnimationFrame(checkButton);
  }
  requestAnimationFrame(checkButton);
}
