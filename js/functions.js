// Функция createTag: создание DOM-элемента из объекта
// Аргументы:
//    objElement - объект следующей структуры: 
//      {
//        tag: 'имя тега',
//        attributes: {'атрибут': 'значение', ...},
//        content: 'содержимое тега'
//      }
// Возвращает: DOM-элемент или null при отсутствии тега в объекте
// Используемые функции: нет
/////////////////////////////////////////////////
function createTag(objElement) {
  'use strict';
 
  if (objElement.tag) {
    var domElement = document.createElement(objElement.tag);

    for (var key in objElement.attributes) {
      domElement.setAttribute(key, objElement.attributes[key]); 
    }
    
    // В content должен находиться примитив. Если там находится объект, он не вставляется
    if ((!objElement.content) || (typeof objElement.content !== 'object')) {
      domElement.innerHTML = objElement.content || '';
    }
  
    return domElement;
  
  } else {
    console.log('Создание тега: отсутствует имя');
    return null;
  }
}

// Функция renderDom: вставка DOM-элемента в документ
// Аргументы:
//    target - целевой элемент, куда должен быть вставлен созданный элемент
//    objElements - объект или массив объектов следующей структуры:
//      {
//        tag: 'имя тега',
//        attributes: {'атрибут': 'значение', ...},
//        content: 'содержимое тега'
//      }
// Возвращает: созданный элемент или null при отсутствии тега в объекте
// Используемые функции: createTag
/////////////////////////////////////////////////
function renderDom(target, objElements) {
  'use strict';

  if (Array.isArray(objElements)) {
    objElements.forEach(function(objElement) {
      renderDom(target, objElement);
    }) 
  } else if (objElements.tag) {
    var element = createTag(objElements);

    if (typeof objElements.content === 'object') {
      renderDom(element, objElements.content);
    }
    
    target.appendChild(element);

    return element;
  
  } else {
    console.log('Отрисовка тега: отсутствует имя');

    return null;
  }
}

// Функция replaceTemplate: замена подстрок '#template#' в объекте заданными значениями
// Аргументы:
//    objectForReplace - объект, в котором должна быть произведена замена
//    replacementArray - массив значений для замены
// Возвращает: измененный объект
// Используемые функции: нет
/////////////////////////////////////////////////
function replaceTemplate(objectForReplace, replacementArray) {
  'use strict';

  if (replacementArray[0]) {
    if (typeof objectForReplace === 'string') {
      return objectForReplace.replace('#template#', replacementArray);
    } else if (typeof objectForReplace === 'object') {

      var obj = {};

      for (var key in objectForReplace) {
        if (typeof objectForReplace[key] === 'string') {
          if (~objectForReplace[key].indexOf('#template#')) {
            obj[key] = replaceTemplate(objectForReplace[key], replacementArray.shift().toString());
          } else {
            obj[key] = objectForReplace[key];
          }
        } else {
          obj[key] = replaceTemplate(objectForReplace[key], replacementArray);
        }
      }
      
      return obj;
    }
  }
}

// Функция mixLetters: перемешивание массива букв
// Аргументы:
//    letters - массив букв
// Возвращает: измененный массив
// Используемые функции: нет
/////////////////////////////////////////////////
function mixLetters(letters) {
  var mixedLetters = [];
  for (var i = 0; i < letters.length; i++) {
    mixedLetters[i] = letters[i];
    mixedLetters[i].number = i + 1;
  }

  for (var i = 0; i < mixedLetters.length; i++) {
    var randIndex = Math.floor(letters.length * Math.random());
    [mixedLetters[i], mixedLetters[randIndex]] = [mixedLetters[randIndex], mixedLetters[i]];
  }

  return mixedLetters;
}

// Функция getLetterVariant: выбор варианта буквы
// Аргументы:
//    letter - объект с описанием буквы
//    features - объект с описанием особенностей языка
// Возвращает: ключ варианта буквы
// Используемые функции: нет
/////////////////////////////////////////////////
function getLetterVariant(answer, features) {
  var keys = ['single'];
  
  for (var key in features) {
    if (features[key] === true && answer[key]) {
      keys.push(key);
    }
  };
  
  if (keys.length > 1) {
    return keys[Math.floor(keys.length * Math.random())];
  }
  return keys[0];
}

// Функция getLegend: формирование символьного обозначения 
//                    местоположения буквы в слове
// Аргументы:
//    letter - ключ варианта буквы
// Возвращает: символ, обозначающий местоположения буквы
// Используемые функции: нет
/////////////////////////////////////////////////
function getLegend(letterVariant) {
  var legends = {
    single: '',
    begin: 'Н',
    middle: 'С',
    end: 'К'
  }

  return legends[letterVariant];
}

// Функция getCookie: чтение кука с заданным именем
// Аргументы: 
//    name - название кука
// Возвращает: значение кука или undefined
// Используемые функции: нет
/////////////////////////////////////////////////
function getCookie(name) {
  'use strict';

  var matches = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)")
    );

  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Функция setCookie: установка кука с заданным именем и сроком 
// Аргументы: 
//    name - название кука
//    value - значение кука
//    limit - срок жизни кука, дней (по умолчанию 1)
// Возвращает: ничего
// Используемые функции: нет
/////////////////////////////////////////////////
function setCookie(name, value, limit) {
  'use strict';

  var date = new Date(new Date().getTime() + (limit || 1) * 24 * 60 * 60 * 1000); 
  document.cookie = name + '=' + value + '; path=/; expires=' + date.toUTCString();
}

// Функция deleteCookie: удаление кука 
// Аргументы: 
//    name - название кука
// Возвращает: ничего
// Используемые функции: нет
/////////////////////////////////////////////////
function deleteCookie(name) {
  'use strict';

  var date = new Date(0);
  document.cookie = name + '=; path=/; expires=' + date.toUTCString();
}

// Функция renderTimer: отрисовка часов
// Аргументы: 
//    timer - селектор часов
//    value - значение часов в секундах
// Возвращает: 
// Используемые функции: 
/////////////////////////////////////////////////
function renderTimer(timer, seconds) {
  'use strict';

  var mm = Math.floor(seconds / 60);
  var ss = seconds % 60;

  mm = (mm < 10) ? '0' + mm : mm;
  ss = (ss < 10) ? '0' + ss : ss;
  document.querySelector(timer).innerHTML = mm + ':' + ss;
}
