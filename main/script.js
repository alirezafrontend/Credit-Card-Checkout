const inputNumber = document.querySelectorAll(".inp-card-number>input");
const inpHolder = document.querySelector(".inp-card-holder>input");
const cardNumber = document.querySelector(".card-number");
const placeHolder = document.querySelector(".placeholder>div");
const numMonth = document.querySelector(".num-month");
const numYear = document.querySelector(".num-year");
const cardMonths = document.querySelectorAll(".input-date>.month");
const cardYears = document.querySelectorAll(".input-date>.year");
const cvv2 = document.querySelector(".inp-cvv>input");
const frontCard = document.querySelector(".front-card");
const backCard = document.querySelector(".back-card");
const cvv2Holder = document.querySelector(".cvv2-box>div");

// card number =>

inputNumber.forEach((inpNum) => {
  inpNum.addEventListener("input", () => {
    if (inpNum.value.length > 4) {
      inpNum.value = inpNum.value.slice(0, 4);
    }

    if (inpNum.value.length == 4) {
      if (inpNum.nextElementSibling) {
        inpNum.nextElementSibling.focus();
      } else if (!inpNum.nextElementSibling) {
        inpHolder.focus();
      }
    } else if (inpNum.value.length == 0) {
      if (inpNum.previousElementSibling) {
        inpNum.previousElementSibling.focus();
      }
    }

    let cardNumValue = "";
    inputNumber.forEach((input) => {
      if (input.nextElementSibling) {
        cardNumValue += input.value + " ";
      } else {
        cardNumValue += input.value;
      }
    });
    cardNumber.innerText = cardNumValue;
  });
});

// placeholder =>

inpHolder.addEventListener("input", () => {
  placeHolder.innerText = inpHolder.value;
});

// date =>
const updateDate = () => {
  const month = numMonth.innerText;
  const year = numYear.innerText;
  if (month && year) {
    document.querySelector(".card-date").innerHTML = `<label>Expires</label>
    <div>${month} / ${year}</div>`;
  }
};

cardMonths.forEach((cardMonth) => {
  cardMonth.addEventListener("input", () => {
    let numberMonth = cardMonth.value;

    if (numberMonth.length == 1) {
      if (numberMonth > 1) {
        cardMonth.value = "";
        numMonth.innerText = "";
      }
    } else if (numberMonth.length == 2) {
      if (numberMonth[0] == '0' && numberMonth[1] == '0') {
        cardMonth.value = "";
        numMonth.innerText = "";
      } else if (numberMonth[0] == '1' && numberMonth[1] > '2') {
        cardMonth.value = "";
        numMonth.innerText = "";
      } else if (numberMonth[0] == '0' && numberMonth[1] == '0') {
        cardMonth.value = "";
        numMonth.innerText = "";
      } else {
        numMonth.innerText = numberMonth;
        updateDate();
        if (cardMonth.nextElementSibling) {
          cardMonth.nextElementSibling.focus();
        }
      }
    }
  });
});

cardYears.forEach((cardYear) => {
  cardYear.addEventListener("input", () => {
    if (cardYear.value.length > 4) {
      cardYear.value = cardYear.value.slice(0, 4);
    }
    let numberYear = cardYear.value.slice(2);
    numYear.innerText = numberYear;
    updateDate();
  });
});

//  cvv2 =>

cvv2.addEventListener("focus", () => {
  frontCard.style.transform = "perspective(800px) rotateY(180deg)";
  backCard.style.transform = "perspective(800px) rotateY(0deg)";
});

cvv2.addEventListener("blur", () => {
  frontCard.style.transform = "perspective(800px) rotateY(0deg)";
  backCard.style.transform = "perspective(800px) rotateY(180deg)";
});

cvv2.addEventListener("input", () => {
  if (cvv2.value.length > 5) {
    cvv2.value = cvv2.value.slice(0, 5);
  }
  cvv2Holder.innerText = cvv2.value;
});
