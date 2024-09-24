let dropList = document.querySelectorAll('.drop-list select');
let amount = document.querySelector(".amount");
let getButton = document.querySelector('.convert');
let from = document.querySelector('.from select');
let to = document.querySelector('.to select');
let result = document.querySelector('.result'); // Use document.querySelector for the result

// Define the currencyCodes object with currency codes as keys
let currencyCodes = {
    "USD": "US",
    "EUR": "EU",
    "JPY": "JP",
    "GBP": "GB",
    "AUD": "AU",
    "CAD": "CA",
    "CHF": "CH",
    "CNY": "CN",
    "SEK": "SE",
    "NZD": "NZ",
    "INR": "IN",
    "BRL": "BR",
    "ZAR": "ZA",
    "RUB": "RU",
    "MXN": "MX",
    "SGD": "SG",
    "HKD": "HK",
    "NOK": "NO",
    "KRW": "KR",
    "TRY": "TR",
    "THB": "TH",
    "MYR": "MY",
    "PHP": "PH",
    "IDR": "ID",
    "DKK": "DK",
    "PLN": "PL",
    "HUF": "HU",
    "CZK": "CZ",
    "ILS": "IL",
    "AED": "AE",
    "SAR": "SA",
    "EGP": "EG",
    "CLP": "CL",
    "COP": "CO",
    "ARS": "AR",
    "PEN": "PE",
    "VND": "VN",
    "NGN": "NG"
};

// Populate drop-downs with currency options
for (let i = 0; i < dropList.length; i++) {
    for (let code in currencyCodes) {
        let selected = "";
        if (i === 0 && code === "USD") {
            selected = "selected";
        } else if (i === 1 && code === "NGN") {
            selected = "selected";
        }
        let optionTag = `<option value="${code}" ${selected}>${code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
}

// Event listener for conversion button
getButton.addEventListener("click", e => {
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
        return false;
    } else {
        amountError.innerHTML = "";
        return true;
    }
}

// Fetch exchange rate
function getExchangeRate() {
    let amountVal = amount.value;
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from.value}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.result === "success") {
                let exchangeRate = data.conversion_rates[to.value];
                let total = (amountVal * exchangeRate).toFixed(2);
                result.innerHTML = `${amountVal} ${from.value} = ${total} ${to.value}`;
            } else {
                result.innerHTML = "Something went wrong. Please try again.";
            }
        })
        .catch(error => {
            console.error("Error fetching exchange rate:", error);
            result.innerHTML = "Error fetching data.";
        });
}
