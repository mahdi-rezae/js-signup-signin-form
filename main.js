// Select all the necessary DOM elements
const input = document.querySelectorAll('.input-field');
const toggle = document.querySelectorAll('.toggle');
const main = document.querySelector('main');
const bullets = document.querySelectorAll('.bullets span');
const images = document.querySelectorAll('.image');
const texts = document.querySelector('.text-group');
const signup = document.querySelector('#sign-up');
const signin = document.querySelector('#sign-in');

// When the page loads, start the carousel
document.addEventListener('DOMContentLoaded', carouselMove);

// Check the password strength using a regular expression
function checkPassword() {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    let pass = input[4].value;
    regex.test(pass) ? pass : alert('Your Password Is Weak!');
};

// Handle the form submission for sign up
signup.addEventListener('submit', event => {
    event.preventDefault();
    let signUp = event.target.elements;
    let userData = [];
    Array.from(signUp).slice(0, -1).forEach((input) => {
        userData.push(input.value);
    });
    //checkPassword();
    saveUserData(userData);
    signup.reset();
    input.forEach(inputField => inputField.nextElementSibling.classList.remove('filled'));
});

// Handle the form submission for sign in
signin.addEventListener('submit', event => {
    event.preventDefault();
    let signIn = event.target.elements;
    let userInput = [];
    Array.from(signIn).slice(0, -1).forEach((input) => {
        userInput.push(input.value);
    });
    getUserData(userInput);
    signin.reset();
    input.forEach(inputField => inputField.nextElementSibling.classList.remove('filled'));
});

// Add an event listener to each input field to show the label when the field is filled
input.forEach(inputField => {
    inputField.addEventListener('input', () => {
        if (inputField.value) {
            inputField.nextElementSibling.classList.add('filled');
        } else {
            inputField.nextElementSibling.classList.remove('filled');
        }
    });
});

// Add an event listener to each toggle button to switch between sign up and sign in modes
toggle.forEach(btn => {
    btn.addEventListener('click', () => main.classList.toggle('sign-up-mode'));
})

// Initialize the carousel and start moving through the slides
let currentBullet = 1;
function carouselMove() {
    setInterval(() => {
        currentBullet = currentBullet < 3 ? currentBullet + 1 : 1;
        sliderMove(currentBullet);
    }, 3000);
}

// Move the carousel to the specified slide
function sliderMove(value) {
    // Update the active bullet
    bullets.forEach(blt => blt.classList.remove('active'));
    bullets[value - 1].classList.toggle('active');

    // Show the current image
    let currentImage = document.querySelector(`.img-${value}`);
    images.forEach(img => img.classList.remove('show'));
    currentImage.classList.toggle('show');

    // Move the text up or down depending on the slide
    texts.style.transform = `translateY(${(value - 1) * -2.2}rem)`;
}

// Save the user's data to local storage
function saveUserData(data) {
    let datas;
    if (localStorage.getItem("datas") === null) {
        datas = [];
    } else {
        datas = JSON.parse(localStorage.getItem("datas"));
    }
    datas.push(data);
    localStorage.setItem("datas", JSON.stringify(datas))
}

// Check the user's login information against saved data in local storage
function getUserData(input) {
    const datas = JSON.parse(localStorage.getItem('datas')) || [];
    const match = datas.find(
        (data) => (data[0] === input[0] || data[1] === input[0]) && data[2] === input[1]
    );
    if (match) {
        alert('YOU HAVE SUCCESSFULY LOGINED IN! :)');
    } else {
         alert('YOUR LOGIN INFORMATION IS INCORRECT! :(');
    }
}
