var alphPronounce = function(args) {
  'use strict';

  var mainElement = args.target;
  var language = args.language;
  var languageName = args.languageName;
  var letters = args.letters;

  // блок с объяснением упражнения
  var pageHeader = [
    {
      tag: 'h2',
      attributes: {
        'class': 'explanation'
      },
      content: languageName
    },
    {
      tag: 'p',
      attributes: {
        'class': 'explanation'
      },
      content: 'Нажимайте на кнопки в алфавитном порядке'
    },
  ];
  renderDom(mainElement, pageHeader);  

  // блок с упражнением
  var buttonTemplate = {
    tag: 'button',
    attributes: {
      'class': 'btn',
      'data-number': '#template#'
    },
    content: '#template#'
  };

  var buttonsArray = [];
  var randLetters = mixLetters(letters);
  var counter = 0;

  randLetters.forEach(function(letter) {  // каждая кнопка получает порядковый номер для связи с массивом букв
    var button = replaceTemplate(buttonTemplate, [++counter, letter.name]);
    buttonsArray.push(button);
  });

  var exercise = {
    tag: 'div',
    attributes: {
      'class': 'answers'
    },
    content: buttonsArray
  };
  renderDom(mainElement, exercise);  

  // статусная строка
  var statusBar = {
    tag: 'div',
    attributes: {
      'class': 'status'
    },
    content: []
  };

  var best = {
    tag: 'div',
    attributes: {
      'class': 'bestTime'
    },
    content: '00:00'       
  }
  statusBar.content.push(best);
  
  var timer = {
    tag: 'div',
    attributes: {
      'class': 'timer'
    },
    content: '00:00'
  }
  statusBar.content.push(timer);

  var life = {
    tag: 'img',
    attributes: {
      'class': 'life',
      'src': 'img/heart.png',
      'data-life': '#template#'
    }
  };
  
  var lifeCounter = 0;

  for (var i = 0; i < 3; i++) {   // для облегчения задачи дается три жизни
    statusBar.content.push(replaceTemplate(life, [++lifeCounter]));
  };
  renderDom(mainElement, statusBar);                              

  var bestTime = getCookie('bestTime-' + language + '-pron') || 0;  // лучшее время хранится в куках
  renderTimer('.bestTime', bestTime);
  if (!bestTime) {
    bestTime = Infinity
  }

  // если есть запущенный таймер, удаляем его
  var timerId = getCookie('timerId') || null;
  if (timerId) {
    clearInterval(timerId);
    deleteCookie('timerId');
  }

  var number = 0;
  var timerStart = false;
  var lifeRest = 3;
  var timerValue = 0;

  document.querySelectorAll('.btn').forEach(function(item) {
    item.onclick = function() {

      if (!timerStart) {    // при первом нажатии на любую кнопку 
        timerStart = true;  // запускается таймер
        timerId = setInterval(function() {renderTimer('.timer', ++timerValue)}, 1000);
        setCookie('timerId', timerId);  // его ID записывается в куки для возможности удаления с другой страницы
        document.querySelectorAll('.btn').forEach(function(item) {  // удаляется анимация кнопок
          item.classList.remove('animated');
        });
      }
      
      if (randLetters[item.getAttribute('data-number') - 1].number === ++number) { // при нажатии на правильную кнопку
        item.classList.add('success');                                             // она становится зеленой
        if (randLetters.length === number) {  // если правильно нажаты все кнопки
          number = 0;                         // сбрасываются все счетчики
          timerStart = false;
          lifeRest = 3;
          clearInterval(timerId);             // удаляется таймер
          deleteCookie('timerId');
          randLetters = mixLetters(letters);  // буквы снова перемешиваются
          setTimeout(redrawButtons, 500, randLetters, true); // через 0.5 сек кнопки перерисовываются c анимацией
          if (timerValue < bestTime) {        // если установлен рекорд
            bestTime = timerValue;            
            setCookie('bestTime-' + language + '-pron', bestTime, 365); // рекорд записывается в куки на 365 дней
            renderTimer('.bestTime', bestTime);  // обновляется значение рекорда на странице
            alert('УРА!\nНОВЫЙ РЕКОРД!')         // выводится сообщение 
          }
          timerValue = 0;
        }
      } else {  // если нажата неправильная кнопка
        if (lifeRest) { // если жизни еще есть
          item.classList.add('mistake');      // кнопка на 0.2 сек подсвечивается красным и сгорает одна жизнь
          setTimeout(function() {item.classList.remove('mistake')}, 200);
          document.querySelector('[data-life="' + lifeRest-- + '"]').setAttribute('src', 'img/heart_empty.png');
          number--;
        } else {                              // если жизней нет
          number = 0;                         // сбрасываются все счетчики
          timerStart = false;
          lifeRest = 3;
          timerValue = 0;
          item.classList.add('mistake');      // кнопка подсвечивается красным
          clearInterval(timerId);             // удаляется таймер
          deleteCookie('timerId');
          randLetters = mixLetters(letters);  // буквы перемешиваются
          setTimeout(redrawButtons, 500, randLetters);  // через 0.5 сек кнопки перерисовываются
        }
      }
    }
  });

  // Функция redrawButtons: перерисовка кнопок
  // Аргументы: 
  //    randLetters - массив букв
  //    animation   - необходимость анимации (true, false)
  // Возвращает: ничего
  // Используемые функции: нет
  /////////////////////////////////////////////////
  function redrawButtons(randLetters, animation) {

    if (animation) {
      document.querySelectorAll('.btn').forEach(function(item) {
        item.classList.add('animated');
      })
    }

    var i = 0;    
    document.querySelectorAll('.btn').forEach(function(item) {
      item.classList.remove('success');
      item.classList.remove('mistake');
      item.innerHTML = randLetters[i++].name;
    });

    renderTimer('.timer', 0);
    
    document.querySelectorAll('[data-life]').forEach(function(item) {
      item.setAttribute('src', 'img/heart.png');
    });
  }
}
