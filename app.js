const billInput = document.querySelector("[data-amount]");
const percentBtn = document.querySelectorAll("[btn-percentage]");
const customTip = document.querySelector("[btn-tip-percentage]");
const tipAmount = document.querySelector("[data-display-tip]");
const personAmount = document.querySelector("[data-display-person]");
const btnReset = document.querySelector("[btn-reset]");
const numberPeople = document.querySelector("[data-people]");

let value = "";
billInput.addEventListener("keyup", function () {
  calculation.setBillInput(billInput.value);
  calculation.update();
});

numberPeople.addEventListener("keyup", function () {
  calculation.setNumberPeople(numberPeople.value);
  calculation.update();
});

btnReset.addEventListener("click", () => {
  calculation.reset();
  calculation.update();
});

percentBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    let percentageBtn = event.path[0].innerText;
    percentage = parseInt(percentageBtn.slice(0, percentageBtn.length - 1));
    calculation.focusButton(btn, percentage);
  });
});

// keyup -> run then display.
customTip.addEventListener("keyup", (event) => {
  calculation.focusButton(undefined, customTip.value, true);
});

class Calculation {
  constructor(tipAmount, personAmount) {
    this.tipAmountText = tipAmount;
    this.personAmountText = personAmount;
    this.reset();
  }

  setBillInput(bill) {
    this.bill = bill;
  }
  setNumberPeople(numberPeople) {
    this.numberPeople = numberPeople;
  }

  setPercentage(percentage) {
    this.percentage = parseInt(percentage);
  }

  setTipPerson(value) {
    this.tipPerson = value;
  }
  setAmount(value) {
    this.amount = value;
  }

  getBillInput() {
    return this.bill;
  }

  getNumberPeople() {
    return this.numberPeople;
  }

  getPercentage() {
    return this.percentage;
  }

  getTipPerson() {
    return this.tipPerson;
  }

  getAmount() {
    return this.amount;
  }

  // reset
  reset() {
    if (this.previousBtn !== undefined) this.focusBtnReset();
    this.previousBtn = undefined;
    this.setBillInput(undefined);
    this.setPercentage(0);
    this.setNumberPeople(2);
    // DOM
    customTip.value = "";
    billInput.value = "";
  }
  focusBtnReset() {
    this.previousBtn.style.backgroundColor = "hsl(183, 100%, 15%)";
    this.previousBtn.style.color = "hsl(0, 0%, 100%)";
  }
  // btn
  focusButton(btn, percentage, custom = false) {
    if (custom) {
      if (this.previousBtn !== undefined) {
        this.previousBtn.style.backgroundColor = "hsl(183, 100%, 15%)";
        this.previousBtn.style.color = "hsl(0, 0%, 100%)";
      } else if (btn === null) {
        this.percentBtn = btn;
        this.percentBtn.style.backgroundColor = "hsl(183, 100%, 15%)";
        this.previousBtn.style.color = "hsl(0, 0%, 100%)";
      }
    } else {
      customTip.value = "";
      if (percentage === this.getPercentage()) {
        this.focusButton(null, "0", true);
        return;
      } else if (this.previousBtn === undefined) {
        this.previousBtn = btn;
        this.previousBtn.style.backgroundColor = "hsl(172, 67%, 45%)"; // strong-cyan
        this.previousBtn.style.color = "hsl(183, 100%, 15%)";
      } else {
        this.previousBtn.style.backgroundColor = "hsl(183, 100%, 15%)"; //v-dark-cyan
        this.previousBtn.style.color = "hsl(0, 0%, 100%)";
        this.previousBtn = btn;
        this.previousBtn.style.backgroundColor = "hsl(172, 67%, 45%)"; // strong-cyan
      }
    }
    this.setPercentage(percentage);
    console.log("percentage: " + this.getPercentage());
    this.update();
  }

  calcuate() {
    let tip = (this.getBillInput() * this.getPercentage() * 0.01) / this.getNumberPeople();
    let amount = tip + this.getBillInput() / this.getNumberPeople();
    this.setTipPerson(tip);
    this.setAmount(amount);
  }

  // update
  update() {
    this.calcuate();
    if (isNaN(this.getPercentage()) || isNaN(this.getNumberPeople()) || isNaN(this.getBillInput())) {
      this.tipAmountText.innerText = `$0.00`;
      this.personAmountText.innerText = `$00.00`;
    } else {
      this.tipAmountText.innerText = `$${Number(this.getTipPerson()).toFixed(2)}`;
      this.personAmountText.innerText = `$${Number(this.getAmount()).toFixed(2)}`;
    }
  }
}

const calculation = new Calculation(tipAmount, personAmount);
