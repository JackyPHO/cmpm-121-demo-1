import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Clicker";
document.title = gameName;

const header = document.createElement("HIIIII");
header.innerHTML = gameName;
app.append(header);
const button = document.createElement("button");
button.className = "button";
button.textContent = "👽";
app.append(button);
