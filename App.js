const stocks = document.getElementById("stocks");

const API_KEY = "RX92TQXU9ZVKUO9U";

const input = document.getElementById("search");
const submit = document.getElementById("btn");

const intra = document.getElementById("intra");
const daily = document.getElementById("daily");
const weekly = document.getElementById("weekly");
const monthly = document.getElementById("monthly");

let interval = "";

document.onreadystatechange = async () => {};

submit.addEventListener("click", async () => {
  let response;
  let query = input.value;
  if (interval == "") {
    return;
  } else if (interval == "INTRADAY") {
    response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_${interval}&symbol=${query}&interval=15min&outputsize=compact&apikey=${API_KEY}`
    );
  } else {
    response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_${interval}&symbol=${query}&outputsize=compact&apikey=${API_KEY}`
    );
  }

  const data = await response.json();

  addToWatchlist(query, data, interval);

  console.log(data);
  const res = data["Meta Data"]["2. Symbol"];
  const daily = data["Time Series (Daily)"];

  for (let key in daily) {
    console.log(key, " ", daily[key]);
    const today = daily[key];

    const open = today["1. open"];
    const high = today["2. high"];
    const low = today["3. low"];
    const close = today["4. close"];
    const volume = today["5. volume"];
  }
});

function addToWatchlist(query, response, interval) {
  const element = document.createElement("li");
  const intervalValue = document.createElement("div");
  const currentValue = document.createElement("div");
  const name = document.createElement("div");
  const deleteBtn = document.createElement("button");

  element.classList.add("list-item");
  element.style.backgroundColor = "lightblue"
  name.innerText = query;
  currentValue.innerText = 123.45;
  intervalValue.innerText = interval;
  deleteBtn.innerText = "❌";

  currentValue.style.backgroundColor = "green";
  currentValue.classList.add("block");

  intervalValue.style.backgroundColor = "gray";
  intervalValue.classList.add("block");

  element.appendChild(name);
  element.appendChild(currentValue);
  element.appendChild(intervalValue);
  element.appendChild(deleteBtn);
  stocks.appendChild(element);
}

intra.addEventListener("click", () => {
  interval = "INTRADAY";
  colorReset();
  intra.style.backgroundColor = "#B8336A";
});
daily.addEventListener("click", () => {
  interval = "DAILY";
  colorReset();
  daily.style.backgroundColor = "#B8336A";
});
weekly.addEventListener("click", () => {
  interval = "WEEKLY";
  colorReset();
  weekly.style.backgroundColor = "#B8336A";
});
monthly.addEventListener("click", () => {
  interval = "MONTHLY";
  colorReset();
  monthly.style.backgroundColor = "#B8336A";
});

function colorReset() {
  intra.style.backgroundColor = "#f2f2f2";
  daily.style.backgroundColor = "#f2f2f2";
  weekly.style.backgroundColor = "#f2f2f2";
  monthly.style.backgroundColor = "#f2f2f2";
}
