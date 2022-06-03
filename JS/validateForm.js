var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Siguiente";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n);
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateNameAndLastName() {
  var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
  var name = document.forms.regForm.name.value;
  var lastName = document.forms.regForm.lastName.value;
  if (!regName.test(name) || !regName.test(lastName)) {
    alert("Ingresa corectamente tu nombre y apellido se aceptan solo letras");
    return false;
  } else {
    alert("Correcto");
    return true;
  }
}

function validateEmail() {
  var emailID = document.forms.regForm.eMail.value;
  var atpos = emailID.indexOf("@");
  var dotpos = emailID.lastIndexOf(".");

  if (atpos < 1 || dotpos - atpos < 2) {
    alert("Please enter correct email ID");
    document.regForm.eMail.focus();
    return false;
  }
  return true;
}

function validatePhoneNumber() {
  var regPhoneNumber =
    /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;
  var phoneNumber = document.forms.regForm.phoneNumber.value;
  if (!regPhoneNumber.test(phoneNumber)) {
    alert("Ingresa corectamente el numero de telefono");
    return false;
  } else {
    alert("Correcto");
    return true;
  }
}

function validatDate() {
  var regDate = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;
  var date = document.forms.regForm.dateBirth.value;

  if (regDate.test(date)) {
    var parts = regDate.split("/");
    var dtDOB = new Date(parts[1] + "/" + parts[0] + "/" + parts[2]);
    var dtCurrent = new Date();
    alert("Eligibility 18 years ONLY.");
    if (dtCurrent.getFullYear() - dtDOB.getFullYear() < 18) {
      return false;
    }

    if (dtCurrent.getFullYear() - dtDOB.getFullYear() == 18) {
      //CD: 11/06/2018 and DB: 15/07/2000. Will turned 18 on 15/07/2018.
      if (dtCurrent.getMonth() < dtDOB.getMonth()) {
        return false;
      }
      if (dtCurrent.getMonth() == dtDOB.getMonth()) {
        //CD: 11/06/2018 and DB: 15/06/2000. Will turned 18 on 15/06/2018.
        if (dtCurrent.getDate() < dtDOB.getDate()) {
          return false;
        }
      }
    }
    return true;
  } else {
    alert("Enter date in dd/MM/yyyy format ONLY.");
    return false;
  }
}

function CheckPassword(inputtxt) {
  //To check a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
  var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  if (inputtxt.value.match(passw)) {
    alert("Correct, try another...");
    return true;
  } else {
    alert("Wrong...!");
    return false;
  }
}

function validateForm() {
  // This function deals with validation of the form fields
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  /* if(!validateEmail()) return( false ); */
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}
