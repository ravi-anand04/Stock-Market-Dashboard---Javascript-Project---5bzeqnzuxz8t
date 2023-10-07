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
    alert("Select frequency please...");
    return;
  } else if (interval == "INTRADAY") {
    response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_${interval}&symbol=${query}&interval=5min&outputsize=compact&apikey=${API_KEY}`
    );
  } else {
    response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_${interval}&symbol=${query}&outputsize=compact&apikey=${API_KEY}`
    );
  }

  const data = await response.json();

  addToWatchlist(query, data, interval);

  input.value = "";

  // for (let key in daily) {
  // console.log(key, " ", daily[key]);
  // }
});

function addToWatchlist(query, data, interval) {
  if (interval == "DAILY") {
    res = data["Time Series (Daily)"];
  } else if (interval == "WEEKLY") {
    res = data["Weekly Time Series"];
  } else if (interval == "MONTHLY") {
    res = data["Monthly Time Series"];
  } else {
    res = data["Time Series (5min)"];
  }

  const lastRefresh = data["Meta Data"]["3. Last Refreshed"];
  const date = res[lastRefresh];
  const close = date["4. close"];

  const element = document.createElement("li");
  const intervalValue = document.createElement("div");
  const currentValue = document.createElement("div");
  const name = document.createElement("div");
  const deleteBtn = document.createElement("button");

  element.classList.add("list-item");
  element.style.backgroundColor = "lightblue";
  name.innerText = query;
  name.style.backgroundColor = "orange";
  name.classList.add("block");

  currentValue.innerText = close;
  intervalValue.innerText = interval;
  deleteBtn.innerText = "❌";

  deleteBtn.addEventListener("click", () => {
    element.innerHTML = "";
  });

  currentValue.style.backgroundColor = "green";
  currentValue.style.color = "white";
  currentValue.classList.add("block");

  intervalValue.style.backgroundColor = "gray";
  intervalValue.style.color = "white";
  intervalValue.classList.add("block");

  element.appendChild(name);
  element.appendChild(currentValue);
  element.appendChild(intervalValue);
  element.appendChild(deleteBtn);
  stocks.appendChild(element);

  element.addEventListener("click", () => {
    const modal = document.getElementById("details");
    const modalTitle = document.getElementById("title");
    modalTitle.innerText = name.innerText;
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    const headings = document.createElement("tr");

    const date = document.createElement("th");
    const open = document.createElement("th");
    const high = document.createElement("th");
    const low = document.createElement("th");
    const close = document.createElement("th");
    const volume = document.createElement("th");
    date.innerText = "Date";
    open.innerText = "Open";
    high.innerText = "High";
    low.innerText = "Low";
    close.innerText = "Close";
    volume.innerText = "Volume";
    headings.appendChild(date);
    headings.appendChild(open);
    headings.appendChild(high);
    headings.appendChild(low);
    headings.appendChild(close);
    headings.appendChild(volume);
    thead.appendChild(headings);
    table.appendChild(thead);

    let latestFive = 0;

    for (let key in res) {
      if (latestFive == 5) break;
      const trow = document.createElement("tr");
      const tdata0 = document.createElement("td");
      const tdata1 = document.createElement("td");
      const tdata2 = document.createElement("td");
      const tdata3 = document.createElement("td");
      const tdata4 = document.createElement("td");
      const tdata5 = document.createElement("td");
      tdata0.innerText = key;
      tdata1.innerText = res[key]["1. open"];
      tdata2.innerText = res[key]["2. high"];
      tdata3.innerText = res[key]["3. low"];
      tdata4.innerText = res[key]["4. close"];
      tdata5.innerText = res[key]["5. volume"];
      trow.appendChild(tdata0);
      trow.appendChild(tdata1);
      trow.appendChild(tdata2);
      trow.appendChild(tdata3);
      trow.appendChild(tdata4);
      trow.appendChild(tdata5);
      tbody.appendChild(trow);
      latestFive++;
    }

    table.appendChild(tbody);
    modal.innerText = "";
    table.className = "modal-table";
    modal.appendChild(table);
  });
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
