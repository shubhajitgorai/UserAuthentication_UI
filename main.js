const loginWrapper = document.getElementById('loginContainer');
const createAccountWrapper = document.getElementById('createAccountContainer');
const forgotPasswordWrapper = document.getElementById('forgetPasswordContainer');
const otpVerifyWrapper = document.getElementById('otpVerificationContainer');
let forgotPasswordEmailId = '';

let captcha = document.getElementById('textBox').value;

function logoutLink() {
    loginWrapper.classList.remove('hide');
    dashboardContainer.classList.add('hide');
    createAccountWrapper.classList.add('hide');
    forgotPasswordWrapper.classList.add('hide');
    otpVerifyWrapper.classList.add('hide');
}

function createAccountLink() {
    loginWrapper.classList.add('hide');
    createAccountWrapper.classList.remove('hide');
    dashboardContainer.classList.add('hide');
    forgotPasswordWrapper.classList.add('hide');
    otpVerifyWrapper.classList.add('hide');
} 

function alreadyHaveAccount() {
    loginWrapper.classList.remove('hide');
    createAccountWrapper.classList.add('hide');
    forgotPasswordWrapper.classList.add('hide');
    dashboardContainer.classList.add('hide');
    otpVerifyWrapper.classList.add('hide');
}

function forgotPasswordlink() {
    loginWrapper.classList.add('hide');
    forgotPasswordWrapper.classList.remove('hide');
    dashboardContainer.classList.add('hide');
    createAccountWrapper.classList.add('hide');
    otpVerifyWrapper.classList.add('hide');
}


function login() {
    let username = document.getElementById('userName').value;
    let pass = document.getElementById('pass').value;
    if((username === '' ) && (pass === '')){
        document.getElementById('globalError').classList.remove('hide-error');
        return;
     }
    $.ajax({
        url: 'http://localhost:8080/api/auth/signin',
        type: 'POST',
        data : JSON.stringify({
            'usernameOrEmail' : username,'password': pass}),
        contentType: 'application/json; charset=utf-8', // ConentType that your are sending. No contentType needed if you just posting as query string parameters.
        success: function(response){
                loginWrapper.classList.add('hide');
                createAccountWrapper.classList.add('hide');
                forgotPasswordWrapper.classList.add('hide');
                dashboardContainer.classList.remove('hide');
                otpVerifyWrapper.classList.add('hide');
         },
        error: function(error){
             document.getElementById('globalError').classList.remove('hide-error');
        }
    });
}
function createAccount() {
    let name = document.getElementById('name').value;
    let username = document.getElementById('username').value;
    let useremail = document.getElementById('email').value;
    let dateofbirth = document.getElementById('dob').value;
    let phone = document.getElementById('phonenumber').value;
    let pass = document.getElementById('pass').value;
    let confirmpass = document.getElementById('confirmpassword').value;

    $.ajax({
        url: 'http://localhost:8080/api/auth/signup',
        type: 'POST',
        data : JSON.stringify({
            'name' : name,'username' : username,'email' : useremail,'dob' : dateofbirth,'phonenumber' : phone,'password' : pass,'confirmpassword' : confirmpass}),
        contentType: 'application/json', // ConentType that your are sending. No contentType needed if you just posting as query string parameters.
        success: function(response){
            loginWrapper.classList.remove('hide');
            createAccountWrapper.classList.add('hide');
            forgotPasswordWrapper.classList.add('hide');
            dashboardContainer.classList.add('hide');
            otpVerifyWrapper.classList.add('hide');
         },
        error: function(error){
            document.getElementById('globalErrorCreate').classList.remove('hide-error');
        }
    });
} 
function forgotPassword() {
    
    let useremail = document.getElementById('emailId').value;
    $.ajax({
        url: 'http://localhost:8080/api/auth/forgotPassword',
        type: 'POST',
        data : JSON.stringify({
            'email' : useremail}),
        contentType: 'application/json', // ConentType that your are sending. No contentType needed if you just posting as query string parameters.
        success: function(response){

            otpVerifyWrapper.classList.remove('hide');
            forgotPasswordWrapper.classList.add('hide');
            loginWrapper.classList.add('hide');
            createAccountWrapper.classList.add('hide');
            dashboardContainer.classList.add('hide');
        },
        error: function(error){
            
        }
    });
}
function otpverification() {
    let otp = document.getElementById('otp').value;    
    let pass = document.getElementById('password').value;
    let confpass = document.getElementById('passwordconf').value;
    $.ajax({
        url: 'http://localhost:8080/api/auth/otpValidation',
        type: 'POST',
        data : JSON.stringify({
            'otp' : otp,'password' : pass,'email' : confpass}),
        contentType: 'application/json', // ConentType that your are sending. No contentType needed if you just posting as query string parameters.
        success: function(response){
            otpVerifyWrapper.classList.add('hide');
            forgotPasswordWrapper.classList.add('hide');
            loginWrapper.classList.remove('hide');
            createAccountWrapper.classList.add('hide');
            dashboardContainer.classList.add('hide');
         },
        error: function(error){
          
        }
    });
}
//captcha code
let captchaText = document.querySelector('#captcha');
var ctx = captchaText.getContext("2d");
ctx.font = "30px Roboto";
ctx.fillStyle = "#08e5ff";

let userText = document.querySelector('#textBox');
let submitButton = document.querySelector('#submitButton');
let output = document.querySelector('#output');
let refreshButton = document.querySelector('#refreshButton');
let createAccountButton = document.querySelector('#createAccountButton');
let submitForgetButton = document.querySelector('#submitForgetButton');
let submitResetPassButton = document.querySelector('#submitResetPassButton');


// alphaNums contains the characters with which you want to create the CAPTCHA
let alphaNums = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let emptyArr = [];
// This loop generates a random string of 7 characters using alphaNums
// Further this string is displayed as a CAPTCHA
for (let i = 1; i <= 7; i++) {
    emptyArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
}
var c = emptyArr.join('');
ctx.fillText(emptyArr.join(''),captchaText.width/4, captchaText.height/2);

// This event listener is stimulated whenever the user press the "Enter" button
// "Correct!" or "Incorrect, please try again" message is
// displayed after validating the input text with CAPTCHA
userText.addEventListener('keyup', function(e) {
    // Key Code Value of "Enter" Button is 13
    if (e.keyCode === 13) {
        if (userText.value === c) {
            output.classList.add("correctCaptcha");
            output.innerHTML = "Correct!";
        } else {
            output.classList.add("incorrectCaptcha");
            output.innerHTML = "Incorrect, please try again";
        }
    }
});
// This event listener is stimulated whenever the user clicks the "Submit" button
// "Correct!" or "Incorrect, please try again" message is
// displayed after validating the input text with CAPTCHA
submitButton.addEventListener('click', function() {
    login();
    if (userText.value === c) {
        output.classList.add("correctCaptcha");
        output.innerHTML = "Correct!";
    } else {
        output.classList.add("incorrectCaptcha");
        output.innerHTML = "Incorrect, please try again";
        document.getElementById('refreshButton').click();
    }
});
// This event listener is stimulated whenever the user press the "Refresh" button
// A new random CAPTCHA is generated and displayed after the user clicks the "Refresh" button
refreshButton.addEventListener('click', function() {
    userText.value = "";
    let refreshArr = [];
    for (let j = 1; j <= 7; j++) {
        refreshArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
    }
    ctx.clearRect(0, 0, captchaText.width, captchaText.height);
    c = refreshArr.join('');
    ctx.fillText(refreshArr.join(''),captchaText.width/4, captchaText.height/2);
    output.innerHTML = "";
});
createAccountButton.addEventListener('click', function() {
    createAccount();
});
submitForgetButton.addEventListener('click', function(){
    forgotPassword();
});
submitResetPassButton.addEventListener('click', function() {
    otpverification();
});

