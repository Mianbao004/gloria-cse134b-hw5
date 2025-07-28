let form_errors = [];

const nameInputElement = document.getElementById("name");
const nameErrorMsg = document.getElementById("name-error-msg");
const nameInfoMsg = document.getElementById("name-info-msg");

function fadeOut(element) {
  element.style.opacity = "0";
  setTimeout(() => {
    element.textContent = "";
    element.style.opacity = "1"; //resets
  }, 1000);
}

function updateFormErrorsField() {
  const errorsField = document.getElementById("form-errors");
  errorsField.value = JSON.stringify(form_errors);
}

function addFormError(field, message) {
  const lastError = form_errors[form_errors.length - 1];
  if (!lastError || lastError.field !== field || lastError.error !== message) {
    // form_error is empty, not a back-to-back duplicate
    form_errors.push({ field: field, error: message });
    updateFormErrorsField();
  }
}


nameInputElement.addEventListener("input", () => {
  nameInputElement.setCustomValidity(""); // clear slate
  let message = "";
  let infoMessage = "";

  if (nameInputElement.validity.valid) {
    //valid
    if (nameInputElement.value.trim() === "") {
      message = "WARNING! This field cannot contain only spaces.";
    }
  } else {
    // Invalid
    if (nameInputElement.validity.valueMissing) {
      // If empty string
      message = "WARNING! This field cannot be empty.";
    } else {
      message = "WARNING! This field does not accept illegal characters.";
      infoMessage = "Please only use English characters.";
    }
  }

  nameInputElement.setCustomValidity(message);
  nameErrorMsg.textContent = message; //the name-error output
////////////////////////////////////////////////////////////////////////////////////
  if (message !== "") {
    nameErrorMsg.style.opacity = 1;
    addFormError("name", message);
    console.log(form_errors);
    // If illegal char



//ABOVE
////////////////////////////////////////////////////////////////////////////////////




    if (infoMessage !== "") {
      nameInfoMsg.textContent = infoMessage;
      nameInfoMsg.style.opacity = 1;
    } else {
      nameInfoMsg.textContent = "";
      nameInfoMsg.style.opacity = 0;
    }

    // Fade both messages (only fades info if it's visible)
    setTimeout(() => {
      fadeOut(nameErrorMsg);
      if (infoMessage !== "") {
        fadeOut(nameInfoMsg);
      }
    }, 2000);
  }
  
});

const emailInputElement = document.getElementById("email");
const emailErrorMsg = document.getElementById("email-error-msg");

emailInputElement.addEventListener("input", () => {
  emailInputElement.setCustomValidity(""); // clear slate
  let message = "";

  if (!(emailInputElement.validity.valid)) {
    // Invalid
    if (
      emailInputElement.value.trim() === "" ||
      emailInputElement.validity.valueMissing
    ) {
      message = "WARNING! This field cannot be empty.";
    } else {
      message =
        "WARNING! Please enter a valid email address (e.g., user@example.com)";
    }
  }

  emailInputElement.setCustomValidity(message);
  emailErrorMsg.textContent = message;
////////////////////////////////////////////////////////////////////////////////////
  emailErrorMsg.style.opacity = 1;
  if (message !== "") {
    addFormError('email', message);
    console.log(form_errors);
    setTimeout(() => fadeOut(emailErrorMsg), 2000);
  }
});

////////////////////////////////////////////////////////////////////////////////////
const commentInputElement = document.getElementById("comment");
const commentErrorMsg = document.getElementById("comment-error-msg");
const progressBar = document.getElementById("progress-bar");
const remChars = document.getElementById("remaining-chars");

function charCounter() {
  const maxLength = 600;
  const currentLength = commentInputElement.value.length;
  const percentUsed = (currentLength / maxLength) * 100;

  // Update progress bar value
  progressBar.value = currentLength;

  // Hide remaining characters message by default
  remChars.style.display = "none";

  // Change progress bar color dynamically
  if (percentUsed <= 60) {
    progressBar.style.setProperty('--bar-color', 'rgb(19, 160, 19)');
  } else if (percentUsed > 60 && percentUsed < 85) {
    progressBar.style.setProperty('--bar-color', 'rgb(236, 157, 8)');
  } else {
    progressBar.style.setProperty('--bar-color', 'rgb(241, 9, 9)');
    remChars.textContent = `${maxLength - currentLength} characters left`;
    remChars.style.display = "block";
  }
}

commentInputElement.addEventListener("input", () => {
  commentInputElement.setCustomValidity(""); // clear previous errors
  let message = "";

  // Validation
  if (!commentInputElement.validity.valid) {
    if (commentInputElement.validity.valueMissing) {
      message = "WARNING! This field cannot be empty.";
    } else if (commentInputElement.validity.tooShort) {
      message = `WARNING! Comment must be at least ${commentInputElement.minLength} characters.`;
    } else if (commentInputElement.validity.tooLong) {
      message = `WARNING! Comment must be no more than ${commentInputElement.maxLength} characters.`;
    }
  }

  commentInputElement.setCustomValidity(message);
  commentErrorMsg.textContent = message;

  if (message !== "") {
    commentErrorMsg.style.opacity = 1;
    addFormError("comment", message);
    console.log(form_errors);

    setTimeout(() => fadeOut(commentErrorMsg), 2000);
  }

  charCounter();
});



