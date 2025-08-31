// static/app.js

function changeLanguage(lang) {
    var texts = {
        'en': 'Register',
        'ru': 'Регистрация'
    };
    document.getElementById('button_regist').innerText = texts[lang];
    var texts = {
        'en': 'Login',
        'ru': 'Войти'
    };
    document.getElementById('button_login').innerText = texts[lang];

}
