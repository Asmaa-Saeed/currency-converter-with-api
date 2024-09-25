let dropList = document.querySelectorAll(".drop-list select");
let amount = document.querySelector(".amount");
let getButton = document.getElementById("convert");
let from = document.querySelector(".from");
let to = document.querySelector(".to");
let totalConvertedRate = document.querySelector(".totalConvertedRate"); 
let flagImg = document.querySelector(".flagImg");
let exchangeIcon = document.querySelector(".icon-container .icon");

// Define the currencyCodes object with currency codes as keys
let currencyCodes = {
  USD: "US",
  EUR: "EU",
  JPY: "JP",
  GBP: "GB",
  AUD: "AU",
  CAD: "CA",
  CHF: "CH",
  CNY: "CN",
  SEK: "SE",
  NZD: "NZ",
  INR: "IN",
  BRL: "BR",
  ZAR: "ZA",
  RUB: "RU",
  MXN: "MX",
  SGD: "SG",
  HKD: "HK",
  NOK: "NO",
  KRW: "KR",
  TRY: "TR",
  THB: "TH",
  MYR: "MY",
  PHP: "PH",
  IDR: "ID",
  DKK: "DK",
  PLN: "PL",
  HUF: "HU",
  CZK: "CZ",
  ILS: "IL",
  AED: "AE",
  SAR: "SA",
  EGP: "EG",
  CLP: "CL",
  COP: "CO",
  ARS: "AR",
  PEN: "PE",
  VND: "VN",
  NGN: "NG",
};

// Populate drop-downs with currency options
for (let i = 0; i < dropList.length; i++) {
  for (let code in currencyCodes) {
    let selected = ""; // Initialize as an empty string
    if (i === 0 && code === "USD") {
      selected = "selected"; // Set USD as default for the first dropdown
    } else if (i === 1 && code === "EUR") {
      selected = "selected"; // Set EUR as default for the second dropdown
    }

    let optionTag = `<option value="${code}">${code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", (e) => {
        loadFlag(e.target);
    });
};


function loadFlag(element) {
  // Check if the element is from the 'from' or 'to' dropdown
  let flagType = element.classList.contains('from') ? 'from' : 'to'; // Determine which flag to load

  for (let code in currencyCodes) {
      if (code === element.value) { // If currency code is equal to option value
          if (flagType === 'from') {
              document.querySelector('.from-flag').src = `https://flagcdn.com/64x48/${currencyCodes[code].toLowerCase()}.png`;
          } else {
              document.querySelector('.to-flag').src = `https://flagcdn.com/64x48/${currencyCodes[code].toLowerCase()}.png`;
          }
      }
  }
}

exchangeIcon.addEventListener("click", () => {
  let tempCode = from.value;
  from.value = to.value;
  to.value = tempCode;
  getExchangeRate();
  loadFlag(from);
  loadFlag(to);
});

window.addEventListener("load", () => {
  getExchangeRate();
});
// Event listener for conversion button
getButton.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form submission
  if (isValid()) {
    getExchangeRate();
  }
});

// Validate input
function isValid() {
  const amountError = document.querySelector(".amountErrorMessage");
  if (!amount.value || amount.value === "0") {
    amountError.innerHTML = "Please enter a valid amount";
    amount.focus();
    return false;
  } else {
    amountError.innerHTML = "";
    return true;
  }
}

// Fetch exchange rate
function getExchangeRate() {
  let apiKey = "4ccafc0c842324419800afa0";
  let fromVal = from.value;
  let amountVal = amount.value;
  let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromVal}`;

  //fetch api url

  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[to.value];
      let totalExchangeRate = (exchangeRate * amountVal).toFixed(2);
      totalConvertedRate.innerHTML = `${amountVal} ${fromVal} = ${totalExchangeRate} ${to.value}`;
    })
    .catch((error) =>
      totalConvertedRate.innerHTML = `Error: ${error}`
    );
}
