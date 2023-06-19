"use strict";

const account1 = {
  owner: "Karla Nelson",
  movements: [200, 460, -513, 3200, -780, 70, 38, -130],
  pin: 1111,
};

const account2 = {
  owner: "Sem Perl",
  movements: [560, -20, 900, -580, 2000, 200, -700, -100],
  pin: 2222,
};

const account3 = {
  owner: "Anna Tesfaye",
  movements: [690, 20, 800, -1200, -57, 390, 4000, 1200],
  pin: 3333,
};

const account4 = {
  owner: "Derel Armound",
  movements: [4600, 380, -236, -124, -790, 10, 345, 120],
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

//elements
const labelWelcome = document.querySelector(".welcome");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");

const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOn = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");

const labelTimer = document.querySelector(".timer");

//buttons
const btnLogin = document.querySelector(".login__input");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

//inputs
const inputLoginUser = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUser = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

function displayMovements(movements) {
  containerMovements.innerHTML = "";
  movements.forEach((value, index) => {
    const type = value > 0 ? "deposit" : "withdrawal";
    const html = `
        <div class="movements__row">
                <div class="movements__type movements__type--${type}">
                    ${index + 1} ${type}
                </div>
                <div class="movements__date">02/26/2023</div>
                <div class="movements__value">${value}</div>
            </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}
displayMovements(account1.movements);

function createLogIn(accs) {
  accs.forEach((acc) => {
    acc.logIn = acc.owner
      .toLowerCase()
      .split(" ")
      .map(function (val) {
        return val[0];
      })
      .join("");
  });
}
createLogIn(accounts);

function culcPrintBalance(movements) {
  const balance = movements.reduce((acc, val) => acc + val);
  labelBalance.textContent = `${balance}$`;
}
culcPrintBalance(account1.movements);

//Withdrawal and income amounts in the footer
function calcDisplaySum(movements) {
  const income = movements
    .filter((val) => val > 0)
    .reduce((acc, val) => acc + val, 0);
  labelSumIn.textContent = `${income}$`;

  const withdrawal = movements
    .filter((val) => val < 0)
    .reduce((acc, val) => acc + val, 0);
  labelSumOn.textContent = `${Math.abs(withdrawal)}$`;

  labelSumInterest.textContent = `${income + withdrawal}$`;
}

calcDisplaySum(account1.movements);
