document.getElementById("convertBtn").addEventListener("click", convertCurrency);

function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;

  if (amount === "") {
    alert("Please enter an amount");
    return;
  }

  fetchConversionRate(fromCurrency, toCurrency)
    .then((conversionRate) => {
      const convertedAmount = amount * conversionRate;
      const resultElement = document.getElementById("result");
      resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    })
    .catch((error) => {
      alert("Error converting currency");
      console.error(error);
    });
}

function fetchConversionRate(fromCurrency, toCurrency) {
  // Replace the URL with your own currency conversion API endpoint
  const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Currency conversion API request failed with status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data.rates[toCurrency];
    });
}
