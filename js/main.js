//CardHolder Name
let nameCard = document.querySelector(".card__details-name");
let nameInput = document.querySelector("#cardholder");
let nameError = document.querySelector(".form__cardholder--error");

//CardNumber
let numberCard = document.querySelector(".card__number");
let numberInput = document.querySelector("#cardnumber");
let numberError = document.querySelector(".form__cardnumber--error");

//MM
let monthCard = document.querySelector(".card__month");
let monthInput = document.querySelector("#cardmonth");
let monthError = document.querySelector(".form__mm--error");

//YY
let yearCard = document.querySelector(".card__year");
let yearInput = document.querySelector("#cardyear");
let yearError = document.querySelector(".form__yy--error");

//CVC
let cvcCard = document.querySelector(".card-back__cvc");
let cvcInput = document.querySelector("#cardcvc");
let cvcError = document.querySelector(".form__cvc--error");

//Secciones
let formSection = document.querySelector(".form");
let thanksSection = document.querySelector(".thanks-section");

//Ingreso dinamico - CardHolder Name
nameInput.addEventListener("input", () => {
  if (nameInput.value == "") {
    nameCard.innerText = "Jane Appleseed";
  } else {
    nameCard.innerText = nameInput.value;
  }
});

//Ingreso dinamico - CardNumber
numberInput.addEventListener("input", (e) => {
  let inputValue = e.target.value;

  //Mostrar numeros en tarjeta
  numberCard.innerText = numberInput.value;

  //Validar ingreso solo numeros
  //Agrega espacio cada 4 digitos
  let regExp = /[A-z]/g;
  if (regExp.test(numberInput.value)) {
    showError(numberInput, numberError, "Wrong format, numbers only", true);
  } else {
    numberInput.value = inputValue
      .replace(/\s/g, "")
      .replace(/([0-9]{4})/g, "$1 ")
      .trim();

    showError(numberInput, numberError, "", false);
  }

  //Validar si el input esta vacio
  if (numberInput.value == "") {
    numberCard.innerText = "0000 0000 0000 0000";
  }
});

//Ingreso dinamico - MM
monthInput.addEventListener("input", () => {
  monthCard.innerText = monthInput.value;
  validateLetters(monthInput, monthError);
});

//Ingreso dinamico - YY
yearInput.addEventListener("input", () => {
  yearCard.innerText = yearInput.value;
  validateLetters(yearInput, yearError);
});

//Ingreso dinamico - CVC
cvcInput.addEventListener("input", () => {
  cvcCard.innerText = cvcInput.value;
  validateLetters(cvcInput, cvcError);
});

//Btn Confirm
let confirmBtn = document.querySelector(".form__submit");

//Validaciones OK
let nameValidation = false;
let numberValidation = false;
let monthValidation = false;
let yearValidation = false;
let cvcValidation = false;

confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();

  //Validar nombre
  if (verifyIsFilled(nameInput, nameError)) {
    nameValidation = true;
  } else {
    nameValidation = false;
  }

  //Validar numero
  if (verifyIsFilled(numberInput, numberError)) {
    if (numberInput.value.length == 19) {
      showError(numberInput, numberError, "", false);
      numberValidation = true;
    } else {
      showError(numberInput, numberError, "Wrong number", true);
      numberValidation = false;
    }
  }

  //Validar MM
  if (verifyIsFilled(monthInput, monthError)) {
    if (parseInt(monthInput.value) > 0 && parseInt(monthInput.value) <= 12) {
      showError(monthInput, monthError, "", false);
      monthValidation = true;
    } else {
      showError(monthInput, monthError, "Wrong Month", true);
      monthValidation = false;
    }
  }

  //Validar YY
  if (verifyIsFilled(yearInput, yearError)) {
    if (parseInt(yearInput.value) > 21 && parseInt(yearInput.value) <= 99) {
      showError(yearInput, yearError, "", false);
      yearValidation = true;
    } else {
      showError(yearInput, yearError, "Wrong Year", true);
      yearValidation = false;
    }
  }
  //Validar CVC
  if (verifyIsFilled(cvcInput, cvcError)) {
    if (cvcInput.value.length == 3) {
      showError(cvcInput, cvcError, "", false);
      cvcValidation = true;
    } else {
      showError(cvcInput, cvcError, "Wrong CVC", true);
      cvcValidation = false;
    }
  }

  //Confirmar operacion
  if (
    nameValidation == true &&
    numberValidation == true &&
    monthValidation == true &&
    yearValidation == true &&
    cvcValidation == true
  ) {
    formSection.style.display = "none";
    thanksSection.style.display = "block";
  }
});

//Funciones utiles
function showError(input, divError, msgError, show = true) {
  if (show) {
    divError.innerText = msgError;
    input.style.borderColor = "#FF0000";
  } else {
    divError.innerText = msgError;
    input.style.borderColor = "hsl(270, 3%, 87%)";
  }
}

function verifyIsFilled(divInput, divError) {
  if (divInput.value.length > 0) {
    showError(divInput, divError, "", false);
    return true;
  } else {
    showError(divInput, divError, "Can't be blank", true);
    return false;
  }
}

function validateLetters(input, error) {
  let regExp = /[A-z]/g;
  if (regExp.test(input.value)) {
    showError(input, error, "Wrong format, numbers only", true);
  } else {
    showError(input, error, "", false);
  }
}
