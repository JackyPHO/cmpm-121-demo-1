import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Alien Spawner";
document.title = gameName;
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
let counter = 0;
let growthRate = 0;

function newButton(name: string) {
  const button = document.createElement("button");
  button.textContent = name;
  return button;
}

//Main Alien Spawn Button
const clickButton = newButton("👽");
app.append(clickButton);
clickButton.addEventListener("click", function () {
  counter++;
  updateCount();
});

//Score Display Updated
const score: HTMLDivElement = document.querySelector("#score")!;
const count = document.createElement("h2");
function updateCount() {
  count.innerHTML = `${counter.toFixed(2)} 👽<br>${growthRate.toFixed(1)} Aliens / sec`;
  score.append(count);
}
function calculateFPS(timestamp: number, lastFrame: number): number {
  const deltaTime = timestamp - lastFrame;
  const framesPerSecond = 1000 / deltaTime;
  return framesPerSecond;
}
let last = performance.now();
function updateScore(timestamp: number) {
  const fps = calculateFPS(timestamp, last);
  last = timestamp;
  counter += growthRate / fps;
  updateCount();
  requestAnimationFrame(updateScore);
}
requestAnimationFrame(updateScore);

//Alien Shop Button Interface
const shop = document.getElementById("shop");
const multiplier = 1.15;
let colorChange = 138;
let color = `rgb(74, 189, ${colorChange})`;

function roundNumber(num: number): string {
  return num.toFixed(2).replace(/\.?0+$/, "");
}
function getFirstCharacter(str: string): string {
  return Array.from(str)[0];
}

interface Item {
  name: string;
  cost: number;
  rate: number;
  tracker: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "🚀 Rocket",
    cost: 10,
    rate: 0.1,
    tracker: 0,
    description: "Rockets Should Do the Trick",
  },
  {
    name: "🛸 UFO",
    cost: 100,
    rate: 2,
    tracker: 0,
    description: "UFO Can Speed Up the Process",
  },
  {
    name: "👾 ET",
    cost: 1000,
    rate: 50,
    tracker: 0,
    description: "Giant ET Boss To the Rescue",
  },
  {
    name: "🌌 Universe",
    cost: 10000,
    rate: 250,
    tracker: 0,
    description: "Let's Spread Across the Universe",
  },
  {
    name: "💫 Multiverse",
    cost: 500000,
    rate: 1000,
    tracker: 0,
    description: "MULTIVERSE OF MADNESS",
  },
];
function createContent(button: HTMLButtonElement, text: HTMLElement) {
  const content = document.createElement("div");
  content.classList.add("content");
  text.classList.add("text");
  content.appendChild(button);
  content.appendChild(text);
  return content;
}
availableItems.forEach((items) => {
  const shopButton = newButton(items.name);
  //https://github.com/ishachury20/cmpm-121-demo-1/blob/main/src/main.ts
  //Background color button change from ishachury20
  shopButton.style.backgroundColor = color;
  colorChange += 30;
  color = `rgb(74, 189, ${colorChange})`;
  const shopText = document.createElement("div");
  shopButton.addEventListener("click", function () {
    growthRate += items.rate;
    counter -= items.cost;
    items.cost *= multiplier;
    items.tracker++;
  });
  const shopItem = createContent(shopButton, shopText);
  //Updates the item count and shop text based on user input
  function checkButton() {
    shopButton.disabled = counter < items.cost;
    shopText.innerHTML = `-${roundNumber(items.cost)} Aliens = +${items.rate} Aliens/sec
    <br><i>${items.description}</i>
    <br>Total ${items.tracker}${getFirstCharacter(items.name)}`;
    requestAnimationFrame(checkButton);
  }
  if (shop) {
    shop.appendChild(shopItem);
  }
  requestAnimationFrame(checkButton);
});
