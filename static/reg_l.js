// static/app.js

function changeLanguage(lang) {
    var texts = {
        'en': 'Username',
        'ru': 'Имя'
    };
    document.getElementById('username_text').innerText = texts[lang];
    var texts = {
        'en': 'Password',
        'ru': 'Пароль'
    };
    document.getElementById('password_text').innerText = texts[lang];
    var texts = {
        'en': 'Register',
        'ru': 'Регистрация'
    };
    document.getElementById('button_register').innerText = texts[lang];
    var texts = {
        'en': 'Email',
        'ru': 'Почта'
    };
    document.getElementById('email').innerText = texts[lang];
    
}
