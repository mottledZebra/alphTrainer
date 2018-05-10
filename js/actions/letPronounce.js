var letPronounce = function(args) {
  'use strict';

  var mainElement = args.target;
  var language = args.language;
  var languageName = args.languageName;
  var letters = args.letters;
  var features = args.features;

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
      content: 'Нажмите на кнопку, соответствующую названию буквы'
    },
  ];
  renderDom(mainElement, pageHeader);  

  // если у буквы есть разные варианты написания, добавляется блок с их обозначениями
  var pageLegendHeader = {
    tag: 'h3',
    attributes: {
      'class': 'explanation'
    },
    content: 'Обозначения:'
  };
  
  var legends = {
    begin: 'Н - буква в начале слова',
    middle: 'С - буква в середине слова',
    end: 'К - буква в конце слова'
  }
  var legendTemplate = {
    tag: 'p',
    attributes: {
      'class': 'explanation'
    },
    content: '#template#'
  };
  var pageLegend = [];

  for (var key in features) {
    if (features[key] === true) {
      pageLegend.push(replaceTemplate(legendTemplate, [legends[key]]));
    }
  };
  
  if (pageLegend.length) {
    renderDom(mainElement, pageLegendHeader);  
    renderDom(mainElement, pageLegend);  
  }

  // блок с упражнением
  var randLetters = mixLetters(letters);                  // перемешиваем массив с буквами 
  var answersArray = mixLetters(randLetters.slice(0, 4)); // и берем первые четыре
  var questionIndex = Math.floor(answersArray.length * Math.random());  // выбираем букву для вопроса
  var letterVariant = getLetterVariant(answersArray[questionIndex], features);

  var question = {
    tag: 'h3',
    content: answersArray[questionIndex].name + ' ' + getLegend(letterVariant)
  };

  var answerTemplate = {
    tag: 'button',
    attributes: {
      'class': 'btn',
      'data-number': '#template#'
    },
    content: {
      tag: 'img',
      attributes: {
        'src': 'img/' + language + '/' + '#template#'    
      }
    }
  };

  var buttonsArray = [];
  var counter = 0;

  answersArray.forEach(function(answer) { 
    letterVariant = getLetterVariant(answer, features);
    // каждая кнопка получает порядковый номер для связи с массивом букв
    // и, при наличии, один из вариантов размещения буквы в слове
    var button = replaceTemplate(answerTemplate, [++counter, answer[letterVariant]]);
    buttonsArray.push(button);
  });

  var exercise = {
    tag: 'div',
    attributes: {
      'class': 'exercise'
    },
    content: [
      { 
        tag: 'div',
        attributes: {
          'class': 'question'
        },
        content: question
      },
      { 
        tag: 'div',
        attributes: {
          'class': 'answers'
        },
        content: buttonsArray
      }  
    ]
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

  var relation = {
    tag: 'div',
    attributes: {
      'class': 'relation'
    },
    content: [
      {
        tag: 'span',
        attributes: {
          'class': 'right'
        },
        content: '0/'
      },
      {
        tag: 'span',
        attributes: {
          'class': 'wrong'
        },
        content: '0'
      },
    ]
  };
  statusBar.content.push(relation);
  
  var percent = {
    tag: 'div',
    attributes: {
      'class': 'percent'
    },
    content: '0%'
  }
  statusBar.content.push(percent);

  renderDom(mainElement, statusBar);                              
  
  var rightClick = 0;
  var wrongClick = 0;

  // результат клика по кнопке отражается на табло верных/неверных ответов и проценте верных ответов
  document.querySelectorAll('.btn').forEach(function(item) {
    item.onclick = function() {
      if (item.getAttribute('data-number') - 1 === questionIndex) {
        item.classList.add('success');
        document.querySelector('.right').innerHTML = ++rightClick + '/';
      } else {
        item.classList.add('mistake');  
        document.querySelector('.wrong').innerHTML = ++wrongClick;
      }
      document.querySelector('.percent').innerHTML = (rightClick / (rightClick + wrongClick) * 100).toFixed(1) + '%';
      randLetters = mixLetters(letters);  
      answersArray = mixLetters(randLetters.slice(0, 4));
      questionIndex =  Math.floor(answersArray.length * Math.random());
      setTimeout(redrawPage, 500, questionIndex, answersArray);
    }
  });

  function redrawPage(questionIndex, answersArray) {
    var questionLetterVariant = getLetterVariant(answersArray[questionIndex], features);

    document.querySelector('.question h3').innerHTML = 
      answersArray[questionIndex].name + ' ' + getLegend(questionLetterVariant);

    var i = 0;
    document.querySelectorAll('.btn').forEach(function(item) {
      item.classList.remove('success');
      item.classList.remove('mistake');
      if (i === questionIndex) {
        var letterVariant = questionLetterVariant;
      } else {
        var letterVariant = getLetterVariant(answersArray[i], features);
      }
      item.querySelector('img').setAttribute('src', 'img/' + language + '/' + answersArray[i++][letterVariant]);
    });
  }
}
