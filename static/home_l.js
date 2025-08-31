// static/app.js

function changeLanguage(lang) {
    var texts = {
        'en': 'You can change your file',
        'ru': 'Вы можете загрузить свой файл'
    };
    document.getElementById('change').innerText = texts[lang];
    var texts = {
        'en': 'Upload',
        'ru': 'Загрузить'
    };
    document.getElementById('upload_button').innerText = texts[lang];
    var texts = {
        'en': 'Load',
        'ru': 'Открыть'
    };
    document.getElementById('load_button').innerText = texts[lang];

    var content_sec = '';
        let seconds = 0;
        let timerInterval;
        count_incorrect = 0;
        var l = true;
        var text_to_type = "{{ text_to_type }}";
        function startTimer() {
            timerInterval = setInterval(function () {
                seconds++;
            }, 1000);
        }
        
        document.addEventListener('keydown', handleKeyPress);
        function handleKeyPress() {
            
            if (l){
                startTimer();
                l = false;
            }
        }

        function stopTimer() {
            clearInterval(timerInterval);
            console.log("Timer stopped, seconds =", seconds);
        }
       


        bluur = false;

        requestAnimationFrame(update);
        function update() {
            var coloredText = document.getElementById('coloredText');
            coloredText.focus();
            var selection = window.getSelection();
            var text = coloredText.innerText;
            selection.removeAllRanges();
            var range = document.createRange();
            range.setStart(coloredText, text.length);
	        range.setEnd(coloredText, text.length);
            selection.addRange(range);
            requestAnimationFrame(update);

        }

        function handleInput() {
            var coloredText = document.getElementById('coloredText');
            var selection = window.getSelection();
            
            // Строка, с которой будем сравнивать
            
            // Цвета для правильных и неправильных букв
            var correctColor = 'green';
            var incorrectColor = 'red';

            // Получаем текст из contenteditable элемента
            var text = coloredText.innerText;
            // Создаем HTML с подсвеченными буквами
            var coloredHTML = '';
            if (text.toString.length <= text_to_type.toString.length){
                for (var i = 0; i < text.length; i++) {
                    if ((text[i] === text_to_type[i]) || ((text.charCodeAt(i) == 160) && (text_to_type.charCodeAt(i) == 32))) {

                        // Если буква соответствует букве в целевой строке, окрашиваем в зеленый цвет
                        coloredHTML += '<span style="color: ' + correctColor + ';">' + text[i] + '</span>';
                    } else {
                            // В противном случае окрашиваем в красный цвет
                            coloredHTML += '<span style="color: ' + incorrectColor + ';">' + text[i] + '</span>';
                            if ((i === text.length - 1) && (coloredText.getAttribute("data-previous-length") < text.length)){
                                count_incorrect += 1;
                            }
                            
                    }
                }
                coloredText.setAttribute("data-previous-length", text.length);
            }

            // Устанавливаем HTML с подсвеченными буквами
            coloredText.innerHTML = coloredHTML;
            if ((text.length === text_to_type.length)){
                c = true;
                for (var i = 0; i < text_to_type.length; i++) {
                    if (((text[i] != text_to_type[i]) && (text_to_type.charCodeAt(i) != 32)) || ((text_to_type.charCodeAt(i) == 32) && (text.charCodeAt(i) != 160))){
                        c = false;    
                    }
                }
                if (c === true){
                    stopTimer();
                    console.log('кол-во ошибок ', count_incorrect);
                    bluur = true;
                    if (bluur === true){
                        coloredText.blur();  
                        var content = document.getElementById('content');
                        content.innerText = "spm " + parseInt((text_to_type.length)/seconds*60) + " acc " + parseInt((1 - (count_incorrect)/text_to_type.length) * 100)+'%';
                    }
                }        
            }
                        
            // Восстанавливаем позицию курсора
		    selection.removeAllRanges();
            var range = document.createRange();
            range.setStart(coloredText, text.length);
	        range.setEnd(coloredText, text.length);
            selection.addRange(range);
            
        }
        
}
