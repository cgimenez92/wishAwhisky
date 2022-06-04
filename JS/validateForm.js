/* Creacion de variables analizando class HTML para ser analizadas */

const usernameEl = document.querySelector("#username");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
const form = document.querySelector("#signup");


/* Verifican que el campo no este vacio (isRequired) y se encuentre entre el valor de caracteres dados como parametros (isBetween) */
const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;


/* (showError) Muestra mensaje de error dentro del tag <small> si el valor del form (input) arroja error || (showSuccess) No muestra ningun mensaje form (input) arroja success*/
const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove("success");
  formField.classList.add("error");

  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSuccess = (input) => {
  const formField = input.parentElement;

  formField.classList.remove("error");
  formField.classList.add("success");

  const error = formField.querySelector("small");
  error.textContent = "";
};


/* Analizan los valores enviados como parametro contra la expresion regular otorgada */
const isEmailValid = (email) => {
  const re = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return re.test(email);
};

const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};


/* Se comprueban las variables creadas al principio del codigo contra cada una de las fgunciones generadas, a fin de verificar su consistencia como valor en el otorgado en el input  */
const checkUsername = () => {
  let valid = false;

  const min = 3,
    max = 25;

  const username = usernameEl.value.trim();

  if (!isRequired(username)) {
    showError(usernameEl, "El nombre de usuario no puede estar en blanco.");
  } else if (!isBetween(username.length, min, max)) {
    showError(
      usernameEl,
      `El nombre de usuario tiene que tener entre ${min} y ${max} caracteres.`
    );
  } else {
    showSuccess(usernameEl);
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "El campo E-mail no puede estar en blanco.");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "E-mail no valido.");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

const checkPassword = () => {
  let valid = false;

  const password = passwordEl.value.trim();

  if (!isRequired(password)) {
    showError(passwordEl, "La contraseña no puede estar en blanco.");
  } else if (!isPasswordSecure(password)) {
    showError(
      passwordEl,
      "La contraseña debe tener 8 caracteres, que incluyen 1 letra en minuscula, 1 letra en Mayuscula, 1 numero y un 1 caracter especial (!@#$%^&*)"
    );
  } else {
    showSuccess(passwordEl);
    valid = true;
  }

  return valid;
};


/* Verifica que todas las funciones llamadas sean validas, para enviar el formulario */
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isUsernameValid = checkUsername(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword();

  let isFormValid = isUsernameValid && isEmailValid && isPasswordValid;

  if (isFormValid) {
  }
});
