// const form = document.querySelector("form"),
// emailField = form.querySelector(".email-field"),
// emailInput = emailField.querySelector(".email")

// // Email Validtion
// function checkEmail() {
// const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
// if (!emailInput.value.match(emailPattern)) {
//     return emailField.classList.add("invalid");
// }
// emailField.classList.remove("invalid");
// }
// // Calling Funtion on Form Sumbit
// form.addEventListener("submit", (e) => {
// e.preventDefault();
// checkEmail();

// //calling function on key up
// emailInput.addEventListener("keyup", checkEmail);

// if (
//     !emailField.classList.contains("invalid") 
// ) {
//     getToken()
// }
// });

// function getToken() {
//     var loginUrl = "http://localhost:8000/api/login"
//     var xhr = new XMLHttpRequest();
//     var userElement = document.getElementById('emailID');
//     // var passwordElement = document.getElementById('password');
//     var tokenElement = document.getElementById('token');
//     var user = userElement.value;
//     // var password = passwordElement.value;
  
//     xhr.open('POST', loginUrl, true);
//     xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
//     xhr.addEventListener('load', function() {
//       var responseObject = JSON.parse(this.response);
//       console.log(responseObject);
//       if (responseObject.token) {
//         // tokenElement.innerHTML = responseObject.token;
//         window.localStorage.setItem('token', token);
//         var url = "http://localhost:8000/api/shortify"
//         var xhr = new XMLHttpRequest();
//         // var tokenElement = document.getElementById('token');
//         // var resultElement = document.getElementById('result');
//         xhr.open('GET', url, true);
//         xhr.setRequestHeader("Authorization", "JWT " + window.localStorage.getItem('token'));
//         window.location.href = "http://localhost:8000/api/shortify"
//         console.log(token)
//       } else {
//         tokenElement.innerHTML = "No token received"
//       }
//     });
  
//     var sendObject = JSON.stringify({email: user});
  
//     console.log('going to send', sendObject);
  
//     xhr.send(sendObject);
//   }
 

  // function getSecret() {

  //   var url = "http://localhost:8000/api/shortify"
  //   var xhr = new XMLHttpRequest();
  //   var tokenElement = document.getElementById('token');
  //   var resultElement = document.getElementById('result');
  //   xhr.open('GET', url, true);
  //   xhr.setRequestHeader("Authorization", "JWT " + window.localStorage.getItem(tokenElement));
  //   window.location = "http://localhost:8000/api/shortify"
  //   // xhr.addEventListener('load', function() {
  //   //   var responseObject = JSON.stringify(this.response);
  //   //   console.log(responseObject);
  //   //   resultElement.innerHTML = this.responseText;
  //   // });
  
  //   // xhr.send(null);
  // }
 
  