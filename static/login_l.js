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
        'en': 'Login',
        'ru': 'Войти'
    };
    document.getElementById('button_login').innerText = texts[lang];
}
