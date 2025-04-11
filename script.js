const form = document.getElementById("converter-form");
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const resultDiv = document.getElementById("result");
const loader = document.getElementById("loader");

const API_URL = "https://open.er-api.com/v6/latest";

// Загрузка списка валют при загрузке страницы
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    const currencies = Object.keys(data.rates);

    currencies.forEach((currency) => {
      const option1 = document.createElement("option");
      option1.value = currency;
      option1.textContent = currency;
      fromCurrency.appendChild(option1);

      const option2 = document.createElement("option");
      option2.value = currency;
      option2.textContent = currency;
      toCurrency.appendChild(option2);
    });

    fromCurrency.value = "USD";
    toCurrency.value = "BYN";
  } catch (error) {
    resultDiv.textContent = "Ошибка загрузки валют.";
  }
});

// Обработка формы
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount) || amount <= 0) {
    resultDiv.textContent = "Введите корректную сумму.";
    return;
  }

  loader.classList.remove("hidden");
  resultDiv.textContent = "";

  try {
    const response = await fetch(`${API_URL}/${from}`);
    const data = await response.json();
    const rate = data.rates[to];

    const converted = (amount * rate).toFixed(2);
    resultDiv.textContent = `${amount} ${from} = ${converted} ${to}`;
  } catch (error) {
    resultDiv.textContent = "Ошибка при получении данных.";
  } finally {
    loader.classList.add("hidden");
  }
});
