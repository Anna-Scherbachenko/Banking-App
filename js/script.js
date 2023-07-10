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
const btnLogin = document.querySelector(".login__btn");
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

//--------------------------------------------------
function displayMovements(movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((value, index) => {
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
//--------------------------------------------------
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
//--------------------------------------------------
function calcPrintBalance(acc) {
  acc.balance = acc.movements.reduce(function (acc, val) {
    return acc + val;
  });

  labelBalance.textContent = `${acc.balance}$`;
}
//--------------------------------------------------
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
//--------------------------------------------------
function updateUI(acc) {
  displayMovements(acc.movements);
  calcPrintBalance(acc);
  calcDisplaySum(acc.movements);
}
//--------------------------------------------------
//registration
let currentAccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find(function (acc) {
    return acc.logIn === inputLoginUser.value;
  });
  console.log(currentAccount);
  if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = 100;
    //deleting "user" and "pin" after registration
    inputLoginPin.value = inputLoginUser.value = "";

    updateUI(currentAccount);
  }
});
//--------------------------------------------------
//Money Transfer
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const reciveAcc = accounts.find(function (acc) {
    return acc.logIn === inputTransferTo.value;
  });
  const amount = Number(inputTransferAmount.value);
  console.log(amount, reciveAcc);
  if (
    reciveAcc &&
    amount > 0 &&
    currentAccount.balance >= amount &&
    reciveAcc.logIn !== currentAccount.logIn
  ) {
    currentAccount.movements.push(-amount);
    reciveAcc.movements.push(amount);
    updateUI(currentAccount);
    inputTransferTo.value = inputTransferAmount.value = "";
  }
});
//--------------------------------------------------
//Close Account
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUser.value === currentAccount.logIn &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(function (acc) {
      return acc.logIn === currentAccount.logIn;
    });
    console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    // console.log(accounts);
  }
  inputCloseUser.value = inputClosePin.value = "";
});

//--------------------------------------------------
//Contribute money
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

//--------------------------------------------------
//Overall balance
const overalBalance = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
  // console.log(account1.movements.sort());


//--------------------------------------------------
//Sort movements
let sorted = false;
btnSort.addEventListener("click", function(e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});