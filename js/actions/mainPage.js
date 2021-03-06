var mainPage = function(args) {
  'use strict';

  var mainElement = args.target; 

  var page = [
    {
      tag: 'h2',
      attributes: {
        'class': 'main-page'
      },
      content: 'Добро пожаловать в алфавитный тренажер!'
    },
    {
      tag: 'p',
      attributes: {
        'class': 'main-page'
      },
      content: 'При изучении любого языка одним из ключевых навыков является уверенное знание алфавита. \
        Но если его символы отличаются от привычных кириллицы или латиницы, то их изучение может представлять большую проблему.'
    },
    {
      tag: 'p',
      attributes: {
        'class': 'main-page'
      },
      content: 'На нашем сайте Вы найдете упражнения, которые помогут Вам выучить алфавиты как современных, \
        так и древних языков. Вы научитесь располагать буквы в алфавитном порядке как по названию, \
        так и по начертанию символов. Также Вы научитесь узнавать отдельные буквы с учетом их особенностей \
        начертания в зависимости от расположения в слове.'
    },
    {
      tag: 'p',
      attributes: {
        'class': 'main-page'
      },
      content: 'Желаем Вам приятной и эффективной учебы!'
    },
  ];

  renderDom(mainElement, page);  
}
