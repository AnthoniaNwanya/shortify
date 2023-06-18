const form = document.querySelector(".form"),
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
    
    function createPass() {
    const passPattern =
    /^(?=.*[-\#\$\.\?\%\&\@\!\+\=\\*])(?=.*[a-zA-Z])(?=.*\d).{8,}$/;    
    
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
    document.querySelector(".form").submit();			}
    });

const navBar = document.querySelector("nav"),
menuBtns = document.querySelectorAll(".menu-icon");
overlay = document.querySelector(".overlay");
mainView = document.querySelector(".card");
menuLogo = document.querySelector(".logo");

menuBtns.forEach((menuBtn) => {
    menuBtn.addEventListener("click", () => {
        navBar.classList.toggle("open");
        mainView.style.display = "none"

    });
});

overlay.addEventListener("click", () => {
    navBar.classList.remove("open");
    mainView.style.display = "block"

});
