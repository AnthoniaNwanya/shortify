const form = document.querySelector("form"),
emailField = form.querySelector(".email-field"),
emailInput = emailField.querySelector(".email"),
passField = form.querySelector(".create-password"),
passInput = passField.querySelector(".password")

// Email Validtion
function checkEmail() {
const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
if (!emailInput.value.match(emailPattern)) {
    return emailField.classList.add("invalid"); 
}
emailField.classList.remove("invalid"); 
}

// Hide and show password
const eyeIcons = document.querySelectorAll(".show-hide");

eyeIcons.forEach((eyeIcon) => {
eyeIcon.addEventListener("click", () => {
    const pInput = eyeIcon.parentElement.querySelector("input"); 
    if (pInput.type === "password") {
        eyeIcon.classList.replace("bx-hide", "bx-show");
        return (pInput.type = "text");
    }
    eyeIcon.classList.replace("bx-show", "bx-hide");
    pInput.type = "password";
});
});

function createPass() {
const passPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if (!passInput.value.match(passPattern)) {
    return passField.classList.add("invalid"); 
}
passField.classList.remove("invalid"); 
}
form.addEventListener("submit", (e) => {
e.preventDefault();
checkEmail();
createPass();
emailInput.addEventListener("keyup", checkEmail);
passInput.addEventListener("keyup", createPass);

if (
    !emailField.classList.contains("invalid") &&
    !passField.classList.contains("invalid")
) {
document.querySelector("form").submit();			}
});