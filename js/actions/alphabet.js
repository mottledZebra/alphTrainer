var alphabet = function(args) {
  'use strict';

  var mainElement = args.target;
  var language = args.language;
  var languageName = args.languageName;
  var letters = args.letters;
  var features = args.features;

  var pageHeader = {
    tag: 'h2',
    attributes: {
      'class': 'explanation'
    },
    content: languageName
  };

  renderDom(mainElement, pageHeader);  

  var counter = 0;

  var columns = {
    number: {
      caption: {
        tag: 'th',
        content: '№'
      },
      content: function() {return ++counter}
    },
    end: {
      caption: {
        tag: 'th',
        content: 'В конце\nслова'
      },
      content: {
        tag: 'img',
        attributes: {
          'src': 'img/' + language + '/#template#'
        }
      }
    },
    middle: {
      caption: {
        tag: 'th',
        content: 'В середине\nслова'
      },
      content: {
        tag: 'img',
        attributes: {
          'src': 'img/' + language + '/#template#'
        }
      }
    },
    begin: {
      caption: {
        tag: 'th',
        content: 'В начале\nслова'
      },
      content: {
        tag: 'img',
        attributes: {
          'src': 'img/' + language + '/#template#'
        }
      }
    },
    single: {
      caption: {
        tag: 'th',
        content: 'Основная\nформа'
      },
      content: {
        tag: 'img',
        attributes: {
          'src': 'img/' + language + '/#template#'
        }
      }
    },
    selfName: {
      caption: {
        tag: 'th',
        attributes: {
          'colspan': '2'
        },
        content: 'Название'
      },
      content: '#template#'
    },
    name: {
      caption: '',
      content: '#template#'
    },
    sound: {
      caption: {
        tag: 'th',
        content: 'Произношение'
      },
      content: {
        tag: 'audio',
        attributes: {
          'controls': 'controls'
        },
        content: {
          tag: 'source',
          attributes: {
            'src': 'sound/' + language + '/#template#'
          }
        }
      }
    },
    transcription: {
      caption: {
        tag: 'th',
        content: 'Транскрипция'
      },
      content: '#template#'
    },
  };

  var columnHeaders = [] ;
  
  for(var key in columns) {
    if (key in features) {
      if (features[key]) {
        columnHeaders.push(columns[key].caption);
      }
    } else {
      columnHeaders.push(columns[key].caption);
    }
  }
  
  var columnsValues = [];

  letters.forEach(function(letter) {  
    var row = {}
    row.tag = 'tr';
    row.content = [];

    for(var key in columns) {
      var cell = {};
      cell.tag = 'td';

      var content;
      if (typeof columns[key].content === 'function') {
        content = columns[key].content();
      } else { 
        content = replaceTemplate(columns[key].content, [letter[key]]);
      }

      if (key in features) {
        if (features[key]) {
          cell.content = content;
          row.content.push(cell);
        }
      } else {
        cell.content = content;
        row.content.push(cell);
      }
    }
    columnsValues.push(row);
  });

  var table = {
    tag: 'table',
    attributes: {
      'class': 'alphabet'
    },
    content: [
      {
        tag: 'thead',
        content: {
          tag: 'tr',
          content: columnHeaders
        }
      },
      {
        tag: 'tbody',
        content: columnsValues
      }
    ]
  }
  renderDom(mainElement, table);  

  if (bannerAlphabet) {
    var banner = {
      tag: 'div',
      attributes: {
        'class': 'banner'
      },
      content: bannerAlphabet
    };
    renderDom(mainElement, banner);  
  }
}
